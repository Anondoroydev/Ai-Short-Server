import type { Request, Response } from 'express';
import { createProjectService } from '../services/project.service';

export async function createProject(req: Request, res: Response) {
  try {
    const project = await createProjectService(req);
    res.json({
      success: true,
      data: project,
    });
    //a
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Project creation failed',
    });
  }
}
