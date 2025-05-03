import { 
  users, 
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type ProjectMember,
  type InsertProjectMember,
  type CodeSnippet,
  type InsertCodeSnippet,
  type Achievement,
  type InsertAchievement,
  type UserAchievement,
  type InsertUserAchievement
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  createProject(project: InsertProject): Promise<Project>;
  getProject(id: number): Promise<Project | undefined>;
  getProjects(userId?: number): Promise<Project[]>;
  
  // Project members methods
  addProjectMember(member: InsertProjectMember): Promise<ProjectMember>;
  getProjectMembers(projectId: number): Promise<ProjectMember[]>;
  
  // Code snippets methods
  createCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet>;
  getCodeSnippets(userId?: number, projectId?: number): Promise<CodeSnippet[]>;
  
  // Achievement methods
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  getAchievements(): Promise<Achievement[]>;
  unlockAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement>;
  getUserAchievements(userId: number): Promise<Achievement[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private projectMembers: Map<number, ProjectMember>;
  private codeSnippets: Map<number, CodeSnippet>;
  private achievements: Map<number, Achievement>;
  private userAchievements: Map<number, UserAchievement>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.projectMembers = new Map();
    this.codeSnippets = new Map();
    this.achievements = new Map();
    this.userAchievements = new Map();
    this.currentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
      fullName: insertUser.fullName || null
    };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const newProject: Project = { 
      ...project, 
      id, 
      createdAt: new Date(),
      updatedAt: new Date(),
      status: project.status || "active",
      description: project.description || null,
      ownerId: project.ownerId || null
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjects(userId?: number): Promise<Project[]> {
    const projects = Array.from(this.projects.values());
    
    if (userId) {
      return projects.filter(project => project.ownerId === userId);
    }
    
    return projects;
  }

  // Project members methods
  async addProjectMember(member: InsertProjectMember): Promise<ProjectMember> {
    const id = this.currentId++;
    const newMember: ProjectMember = { 
      ...member, 
      id,
      role: member.role || "Member" 
    };
    this.projectMembers.set(id, newMember);
    return newMember;
  }

  async getProjectMembers(projectId: number): Promise<ProjectMember[]> {
    return Array.from(this.projectMembers.values())
      .filter(member => member.projectId === projectId);
  }

  // Code snippets methods
  async createCodeSnippet(snippet: InsertCodeSnippet): Promise<CodeSnippet> {
    const id = this.currentId++;
    const newSnippet: CodeSnippet = { 
      ...snippet, 
      id, 
      createdAt: new Date(),
      updatedAt: new Date(),
      projectId: snippet.projectId || null,
      userId: snippet.userId || null
    };
    this.codeSnippets.set(id, newSnippet);
    return newSnippet;
  }

  async getCodeSnippets(userId?: number, projectId?: number): Promise<CodeSnippet[]> {
    let snippets = Array.from(this.codeSnippets.values());
    
    if (userId) {
      snippets = snippets.filter(snippet => snippet.userId === userId);
    }
    
    if (projectId) {
      snippets = snippets.filter(snippet => snippet.projectId === projectId);
    }
    
    return snippets;
  }

  // Achievement methods
  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentId++;
    const newAchievement: Achievement = { ...achievement, id };
    this.achievements.set(id, newAchievement);
    return newAchievement;
  }

  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }

  async unlockAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement> {
    const id = this.currentId++;
    const newUserAchievement: UserAchievement = { 
      ...userAchievement, 
      id, 
      unlockedAt: new Date() 
    };
    this.userAchievements.set(id, newUserAchievement);
    return newUserAchievement;
  }

  async getUserAchievements(userId: number): Promise<Achievement[]> {
    const userAchievements = Array.from(this.userAchievements.values())
      .filter(ua => ua.userId === userId);
    
    const achievementIds = userAchievements.map(ua => ua.achievementId);
    
    return Array.from(this.achievements.values())
      .filter(achievement => achievementIds.includes(achievement.id));
  }
}

export const storage = new MemStorage();
