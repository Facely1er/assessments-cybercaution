import { useState, useEffect, createContext, useContext } from 'react';
import { supabase, userProfiles, organizations, UserProfile, Organization } from '../lib/supabase';
import { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  organization: Organization | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, userData: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<void>;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  organizationName: string;
  industry?: string;
  sizeCategory?: string;
  role?: 'admin' | 'security_analyst' | 'compliance_officer' | 'viewer';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    userProfile: UserProfile | null;
    organization: Organization | null;
    session: Session | null;
    isLoading: boolean;
    isAuthenticated: boolean;
  }>({
    user: null,
    userProfile: null,
    organization: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setAuthState({
            user: null,
            userProfile: null,
            organization: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
          });
          return;
        }

        if (session?.user) {
          await loadUserData(session.user);
        } else {
          setAuthState({
            user: null,
            userProfile: null,
            organization: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setAuthState({
          user: null,
          userProfile: null,
          organization: null,
          session: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Auth state changed
        
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserData(session.user);
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            userProfile: null,
            organization: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
          });
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          setAuthState(prev => ({
            ...prev,
            session,
            user: session.user,
          }));
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUserData = async (user: User) => {
    try {
      // Load user profile
      const userProfile = await userProfiles.getById(user.id);
      
      let organization: Organization | null = null;
      if (userProfile?.organization_id) {
        organization = await organizations.getById(userProfile.organization_id);
      }

      // Update last login
      if (userProfile) {
        await userProfiles.update(user.id, {
          last_login: new Date().toISOString(),
        });
      }

      setAuthState({
        user,
        userProfile,
        organization,
        session: await supabase.auth.getSession().then(({ data }) => data.session),
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      setAuthState({
        user,
        userProfile: null,
        organization: null,
        session: null,
        isLoading: false,
        isAuthenticated: true, // Still authenticated even if profile loading failed
      });
    }
  };

  const signUp = async (email: string, password: string, userData: SignUpData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Create organization first
      const organization = await organizations.create({
        name: userData.organizationName,
        industry: userData.industry,
        size_category: userData.sizeCategory,
        compliance_frameworks: [],
        settings: {},
      });

      if (!organization) {
        return { success: false, error: 'Failed to create organization' };
      }

      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            organization_id: organization.id,
          }
        }
      });

      if (authError) {
        return { success: false, error: authError.message };
      }

      if (!authData.user) {
        return { success: false, error: 'Failed to create user account' };
      }

      // Create user profile
      const userProfile = await userProfiles.create({
        id: authData.user.id,
        organization_id: organization.id,
        email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role || 'admin', // First user in org is admin
        is_active: true,
        preferences: {},
      });

      if (!userProfile) {
        return { success: false, error: 'Failed to create user profile' };
      }

      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'Login failed' };
      }

      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!authState.user) {
        return { success: false, error: 'No authenticated user' };
      }

      const updatedProfile = await userProfiles.update(authState.user.id, updates);
      
      if (!updatedProfile) {
        return { success: false, error: 'Failed to update profile' };
      }

      setAuthState(prev => ({
        ...prev,
        userProfile: updatedProfile,
      }));

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      };
    }
  };

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('Session refresh error:', error);
        return;
      }

      if (data.session?.user) {
        await loadUserData(data.session.user);
      }
    } catch (error) {
      console.error('Session refresh error:', error);
    }
  };

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    refreshSession,
  };
};

export { AuthContext };