export type RMFTask = {
  id: string;
  title: string;
  description: string;
  inputs: string[];
  outputs: string[];
  responsible: string[];
  supporting: string[];
  outcomes: string[];
  references: string[];
  sdlc: string;
  rationale: string;
};

export type RMFStep = {
  id: string;
  name: string;
  description: string;
  tasks: RMFTask[];
};

export type RMFPhase = {
  id: string;
  name: string;
  description: string;
  steps: RMFStep[];
};