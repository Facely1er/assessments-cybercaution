const express = require('express');
const { User } = require('../models/User');
const { authenticateToken, authorize, auditLog } = require('../middleware/auth');
const { logger } = require('../utils/logger');
const { NotFoundError, ValidationError } = require('../middleware/errorHandler');

const router = express.Router();

// Training modules data (in production, this would be stored in a database)
const trainingModules = [
  {
    id: 'mod_001',
    title: 'Cybersecurity Fundamentals',
    description: 'Introduction to cybersecurity concepts, threats, and best practices',
    category: 'foundational',
    duration: 60, // minutes
    difficulty: 'beginner',
    objectives: [
      'Understand basic cybersecurity concepts',
      'Identify common threats and vulnerabilities',
      'Learn security best practices',
      'Recognize social engineering attacks'
    ],
    content: {
      sections: [
        {
          title: 'Introduction to Cybersecurity',
          content: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks...',
          duration: 15
        },
        {
          title: 'Common Threats',
          content: 'Malware, phishing, ransomware, and other common cyber threats...',
          duration: 20
        },
        {
          title: 'Security Best Practices',
          content: 'Password management, software updates, and safe browsing habits...',
          duration: 15
        },
        {
          title: 'Social Engineering',
          content: 'How attackers manipulate people to gain access to systems...',
          duration: 10
        }
      ]
    },
    assessment: {
      questions: [
        {
          id: 'q1',
          question: 'What is the most common type of cyber attack?',
          type: 'multiple_choice',
          options: ['Malware', 'Phishing', 'Ransomware', 'DDoS'],
          correctAnswer: 1
        },
        {
          id: 'q2',
          question: 'Which of the following is NOT a security best practice?',
          type: 'multiple_choice',
          options: ['Using strong passwords', 'Keeping software updated', 'Sharing passwords with colleagues', 'Enabling two-factor authentication'],
          correctAnswer: 2
        }
      ],
      passingScore: 70
    },
    status: 'active',
    version: '1.0',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'mod_002',
    title: 'Data Protection and Privacy',
    description: 'Understanding data classification, handling, and privacy regulations',
    category: 'compliance',
    duration: 45,
    difficulty: 'intermediate',
    objectives: [
      'Understand data classification levels',
      'Learn data handling procedures',
      'Comply with privacy regulations',
      'Implement data protection measures'
    ],
    content: {
      sections: [
        {
          title: 'Data Classification',
          content: 'Understanding different levels of data sensitivity...',
          duration: 15
        },
        {
          title: 'Data Handling Procedures',
          content: 'Proper procedures for handling sensitive data...',
          duration: 15
        },
        {
          title: 'Privacy Regulations',
          content: 'GDPR, CCPA, and other privacy regulations...',
          duration: 15
        }
      ]
    },
    assessment: {
      questions: [
        {
          id: 'q1',
          question: 'What is the highest level of data classification?',
          type: 'multiple_choice',
          options: ['Public', 'Internal', 'Confidential', 'Restricted'],
          correctAnswer: 3
        }
      ],
      passingScore: 80
    },
    status: 'active',
    version: '1.0',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'mod_003',
    title: 'Incident Response',
    description: 'How to detect, respond to, and recover from security incidents',
    category: 'response',
    duration: 90,
    difficulty: 'advanced',
    objectives: [
      'Understand incident response lifecycle',
      'Learn detection and analysis techniques',
      'Master containment and eradication procedures',
      'Implement recovery and lessons learned processes'
    ],
    content: {
      sections: [
        {
          title: 'Incident Response Lifecycle',
          content: 'Preparation, identification, containment, eradication, recovery, and lessons learned...',
          duration: 30
        },
        {
          title: 'Detection and Analysis',
          content: 'How to detect and analyze security incidents...',
          duration: 25
        },
        {
          title: 'Containment and Eradication',
          content: 'Procedures for containing and eradicating threats...',
          duration: 20
        },
        {
          title: 'Recovery and Lessons Learned',
          content: 'Recovery procedures and post-incident analysis...',
          duration: 15
        }
      ]
    },
    assessment: {
      questions: [
        {
          id: 'q1',
          question: 'What is the first step in incident response?',
          type: 'multiple_choice',
          options: ['Containment', 'Identification', 'Preparation', 'Recovery'],
          correctAnswer: 2
        }
      ],
      passingScore: 75
    },
    status: 'active',
    version: '1.0',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  }
];

// User training progress (in production, this would be stored in a database)
const userProgress = new Map();

// Get all training modules
router.get('/modules', authenticateToken, async (req, res, next) => {
  try {
    const { category, difficulty, status = 'active' } = req.query;

    let filteredModules = trainingModules.filter(module => module.status === status);

    if (category) {
      filteredModules = filteredModules.filter(module => module.category === category);
    }

    if (difficulty) {
      filteredModules = filteredModules.filter(module => module.difficulty === difficulty);
    }

    res.json({ modules: filteredModules });
  } catch (error) {
    next(error);
  }
});

// Get specific training module
router.get('/modules/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const module = trainingModules.find(m => m.id === id);
    if (!module) {
      throw new NotFoundError('Training module');
    }

    res.json({ module });
  } catch (error) {
    next(error);
  }
});

// Start training module
router.post('/modules/:id/start', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const module = trainingModules.find(m => m.id === id);
    if (!module) {
      throw new NotFoundError('Training module');
    }

    // Initialize user progress if not exists
    if (!userProgress.has(userId)) {
      userProgress.set(userId, {});
    }

    const userTrainingData = userProgress.get(userId);
    
    if (!userTrainingData[id]) {
      userTrainingData[id] = {
        status: 'in_progress',
        startedAt: new Date(),
        completedAt: null,
        score: null,
        attempts: 0,
        currentSection: 0,
        timeSpent: 0
      };
    } else if (userTrainingData[id].status === 'completed') {
      throw new ValidationError('Module already completed');
    }

    userProgress.set(userId, userTrainingData);

    logger.auditLog('TRAINING_STARTED', req.user, 'training', {
      moduleId: id,
      moduleTitle: module.title,
      ip: req.ip
    });

    res.json({
      message: 'Training module started',
      module: {
        id: module.id,
        title: module.title,
        status: userTrainingData[id].status,
        startedAt: userTrainingData[id].startedAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update training progress
router.put('/modules/:id/progress', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { currentSection, timeSpent } = req.body;
    const userId = req.user.id;

    const module = trainingModules.find(m => m.id === id);
    if (!module) {
      throw new NotFoundError('Training module');
    }

    if (!userProgress.has(userId) || !userProgress.get(userId)[id]) {
      throw new ValidationError('Training module not started');
    }

    const userTrainingData = userProgress.get(userId);
    userTrainingData[id].currentSection = currentSection || userTrainingData[id].currentSection;
    userTrainingData[id].timeSpent = timeSpent || userTrainingData[id].timeSpent;

    userProgress.set(userId, userTrainingData);

    res.json({
      message: 'Progress updated successfully',
      progress: userTrainingData[id]
    });
  } catch (error) {
    next(error);
  }
});

// Complete training module
router.post('/modules/:id/complete', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;
    const userId = req.user.id;

    const module = trainingModules.find(m => m.id === id);
    if (!module) {
      throw new NotFoundError('Training module');
    }

    if (!userProgress.has(userId) || !userProgress.get(userId)[id]) {
      throw new ValidationError('Training module not started');
    }

    const userTrainingData = userProgress.get(userId);
    const progress = userTrainingData[id];

    if (progress.status === 'completed') {
      throw new ValidationError('Module already completed');
    }

    // Calculate score
    let score = 0;
    if (answers && module.assessment) {
      const totalQuestions = module.assessment.questions.length;
      let correctAnswers = 0;

      module.assessment.questions.forEach(question => {
        const userAnswer = answers[question.id];
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      });

      score = Math.round((correctAnswers / totalQuestions) * 100);
    }

    // Update progress
    progress.status = 'completed';
    progress.completedAt = new Date();
    progress.score = score;
    progress.attempts += 1;

    userProgress.set(userId, userTrainingData);

    logger.auditLog('TRAINING_COMPLETED', req.user, 'training', {
      moduleId: id,
      moduleTitle: module.title,
      score,
      ip: req.ip
    });

    res.json({
      message: 'Training module completed successfully',
      result: {
        score,
        passed: score >= module.assessment.passingScore,
        completedAt: progress.completedAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get user training progress
router.get('/progress', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userTrainingData = userProgress.get(userId) || {};

    const progress = Object.keys(userTrainingData).map(moduleId => {
      const module = trainingModules.find(m => m.id === moduleId);
      const userProgress = userTrainingData[moduleId];
      
      return {
        moduleId,
        moduleTitle: module?.title,
        moduleCategory: module?.category,
        status: userProgress.status,
        startedAt: userProgress.startedAt,
        completedAt: userProgress.completedAt,
        score: userProgress.score,
        attempts: userProgress.attempts,
        timeSpent: userProgress.timeSpent
      };
    });

    res.json({ progress });
  } catch (error) {
    next(error);
  }
});

// Get training statistics
router.get('/stats', authenticateToken, authorize('admin', 'security_officer'), async (req, res, next) => {
  try {
    const totalModules = trainingModules.length;
    const activeModules = trainingModules.filter(m => m.status === 'active').length;

    // Calculate completion statistics
    let totalCompletions = 0;
    let totalUsers = 0;
    let averageScore = 0;

    for (const [userId, userData] of userProgress) {
      totalUsers++;
      const completedModules = Object.values(userData).filter(progress => progress.status === 'completed');
      totalCompletions += completedModules.length;
      
      const scores = completedModules.map(progress => progress.score).filter(score => score !== null);
      if (scores.length > 0) {
        averageScore += scores.reduce((sum, score) => sum + score, 0) / scores.length;
      }
    }

    averageScore = totalUsers > 0 ? averageScore / totalUsers : 0;

    const modulesByCategory = trainingModules.reduce((acc, module) => {
      acc[module.category] = (acc[module.category] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalModules,
      activeModules,
      totalUsers,
      totalCompletions,
      averageScore: Math.round(averageScore),
      modulesByCategory
    });
  } catch (error) {
    next(error);
  }
});

// Get user training dashboard
router.get('/dashboard', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userTrainingData = userProgress.get(userId) || {};

    const completedModules = Object.values(userTrainingData).filter(progress => progress.status === 'completed').length;
    const inProgressModules = Object.values(userTrainingData).filter(progress => progress.status === 'in_progress').length;
    const totalModules = trainingModules.length;

    const recentActivity = Object.keys(userTrainingData)
      .map(moduleId => {
        const module = trainingModules.find(m => m.id === moduleId);
        const progress = userTrainingData[moduleId];
        
        return {
          moduleId,
          moduleTitle: module?.title,
          status: progress.status,
          lastActivity: progress.completedAt || progress.startedAt
        };
      })
      .sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity))
      .slice(0, 5);

    const recommendedModules = trainingModules
      .filter(module => !userTrainingData[module.id] || userTrainingData[module.id].status !== 'completed')
      .slice(0, 3);

    res.json({
      summary: {
        completedModules,
        inProgressModules,
        totalModules,
        completionRate: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0
      },
      recentActivity,
      recommendedModules
    });
  } catch (error) {
    next(error);
  }
});

// Create training module (admin only)
router.post('/modules', authenticateToken, authorize('admin'), async (req, res, next) => {
  try {
    const moduleData = req.body;

    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'duration', 'difficulty'];
    for (const field of requiredFields) {
      if (!moduleData[field]) {
        throw new ValidationError(`${field} is required`);
      }
    }

    const newModule = {
      id: `mod_${Date.now()}`,
      ...moduleData,
      status: 'active',
      version: '1.0',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    trainingModules.push(newModule);

    logger.auditLog('TRAINING_MODULE_CREATED', req.user, 'training', {
      moduleId: newModule.id,
      moduleTitle: newModule.title,
      ip: req.ip
    });

    res.status(201).json({
      message: 'Training module created successfully',
      module: {
        id: newModule.id,
        title: newModule.title,
        category: newModule.category,
        status: newModule.status
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update training module (admin only)
router.put('/modules/:id', authenticateToken, authorize('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const moduleIndex = trainingModules.findIndex(m => m.id === id);
    if (moduleIndex === -1) {
      throw new NotFoundError('Training module');
    }

    trainingModules[moduleIndex] = {
      ...trainingModules[moduleIndex],
      ...updateData,
      updatedAt: new Date()
    };

    logger.auditLog('TRAINING_MODULE_UPDATED', req.user, 'training', {
      moduleId: id,
      updatedFields: Object.keys(updateData),
      ip: req.ip
    });

    res.json({
      message: 'Training module updated successfully',
      module: {
        id: trainingModules[moduleIndex].id,
        title: trainingModules[moduleIndex].title,
        status: trainingModules[moduleIndex].status
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;