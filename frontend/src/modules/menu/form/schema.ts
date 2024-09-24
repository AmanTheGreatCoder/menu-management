import { z } from 'zod';

export const createMenuItemSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, 'Name is required'),
	depth: z.number().min(1, 'Depth is required'),
	parentData: z.string().optional(),
});

export type CreateMenuItemSchema = z.infer<typeof createMenuItemSchema>;
