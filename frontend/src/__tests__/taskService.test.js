import { createTask } from '../services/taskService';
import { supabase } from '../services/supabase';
import { vi, describe, test, expect, beforeEach } from 'vitest';


vi.mock('../services/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
    })),
  },
}));

describe('taskService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('createTask llama a Supabase con los datos correctos', async () => {
    const taskData = {
      title: 'Test',
      description: 'desc',
      dueDate: '2025-06-13',
      categoryId: 1,
    };
    const userId = 'fake-user';

    const expectedPayload = {
      titulo: 'Test',
      descripcion: 'desc',
      fecha: '2025-06-13',
      categoria_id: 1,
      user_id: 'fake-user',
    };


    const singleMock = vi.fn().mockResolvedValue({ data: { id: 1, ...expectedPayload }, error: null });
    const selectMock = vi.fn().mockReturnValue({ single: singleMock });
    const insertMock = vi.fn().mockReturnValue({ select: selectMock });
    supabase.from.mockReturnValue({ insert: insertMock });

    await createTask(taskData, userId);

    expect(supabase.from).toHaveBeenCalledWith('tareas');
    expect(insertMock).toHaveBeenCalledWith([expectedPayload]);
    expect(selectMock).toHaveBeenCalledWith('*, categorias ( nombre )');
    expect(singleMock).toHaveBeenCalled();
  });
});
