import { http, HttpResponse, delay } from 'msw';
import { db } from './db';
import { uid } from '@/utils/id';
import type { Task, NewTaskInput, UpdateTaskInput } from '@/types/task';
import type { ShopItem, NewShopInput, UpdateShopInput, Store } from '@/types/shop';

const FAKE_DELAY = () => delay(300 + Math.random() * 200);

export const taskHandlers = [
  http.get('/api/tasks', async () => {
    await FAKE_DELAY();
    return HttpResponse.json(db.tasks);
  }),

  http.post('/api/tasks', async ({ request }) => {
    await FAKE_DELAY();
    const input = (await request.json()) as NewTaskInput;
    const newTask: Task = {
      id: uid(),
      title: input.title.trim(),
      done: false,
      priority: input.priority ?? null,
      remindIn: input.remindIn ?? null,
      note: input.note ?? null,
      created: Date.now(),
    };
    db.tasks.unshift(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.patch('/api/tasks/:id', async ({ params, request }) => {
    await FAKE_DELAY();
    const { id } = params;
    const patch = (await request.json()) as UpdateTaskInput;
    const index = db.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    db.tasks[index] = { ...db.tasks[index], ...patch };
    return HttpResponse.json(db.tasks[index]);
  }),

  http.delete('/api/tasks/:id', async ({ params }) => {
    await FAKE_DELAY();
    const { id } = params;
    const index = db.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    db.tasks.splice(index, 1);
    return HttpResponse.json({ success: true });
  }),
];

export const shopHandlers = [
  http.get('/api/shop', async () => {
    await FAKE_DELAY();
    return HttpResponse.json(db.shop);
  }),

  http.post('/api/shop', async ({ request }) => {
    await FAKE_DELAY();
    const input = (await request.json()) as NewShopInput;
    const newItem: ShopItem = {
      id: uid(),
      name: input.name.trim(),
      qty: input.qty || '',
      store: input.store ?? null,
      done: false,
    };
    db.shop.push(newItem);
    return HttpResponse.json(newItem, { status: 201 });
  }),

  http.patch('/api/shop/:id', async ({ params, request }) => {
    await FAKE_DELAY();
    const { id } = params;
    const patch = (await request.json()) as UpdateShopInput;
    const index = db.shop.findIndex((i) => i.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    db.shop[index] = { ...db.shop[index], ...patch };
    return HttpResponse.json(db.shop[index]);
  }),

  http.delete('/api/shop/:id', async ({ params }) => {
    await FAKE_DELAY();
    const { id } = params;
    const index = db.shop.findIndex((i) => i.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    db.shop.splice(index, 1);
    return HttpResponse.json({ success: true });
  }),
];

export const storeHandlers = [
  http.get('/api/stores', async () => {
    await FAKE_DELAY();
    return HttpResponse.json(db.stores);
  }),

  http.post('/api/stores', async ({ request }) => {
    await FAKE_DELAY();
    const input = (await request.json()) as Omit<Store, 'id'>;
    const newStore: Store = {
      id: uid(),
      name: input.name.trim(),
      icon: input.icon || 'ti-building-store',
    };
    db.stores.push(newStore);
    return HttpResponse.json(newStore, { status: 201 });
  }),
];

export const handlers = [...taskHandlers, ...shopHandlers, ...storeHandlers];