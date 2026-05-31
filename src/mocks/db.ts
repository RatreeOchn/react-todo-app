import type { Task } from '@/types/task';
import type { ShopItem, Store } from '@/types/shop';

export const db = {
  tasks: [
    {
      id: 'seed-1',
      title: 'ปิดน้ำในห้องน้ำ',
      done: false,
      priority: 'urgent',
      remindIn: 5,
      created: Date.now() - 5000,
    },
    {
      id: 'seed-2',
      title: 'ทำเค้กวันเกิดให้แม่',
      done: false,
      priority: 'warn',
      created: Date.now() - 4000,
      subtasks: [
        { id: 'sub-1', title: 'ซื้อวัตถุดิบ', done: true, order: 1 },
        { id: 'sub-2', title: 'อบเค้ก', done: false, order: 2 },
        { id: 'sub-3', title: 'ปั่นครีมแต่งหน้า', done: false, order: 3 },
      ],
    },
    {
      id: 'seed-3',
      title: 'ตากผ้า',
      done: false,
      remindIn: 15,
      note: 'เครื่องปั่นแห้งใกล้เสร็จ',
      created: Date.now() - 3000,
    },
    {
      id: 'seed-4',
      title: 'ส่งงานวิชาประวัติศาสตร์',
      done: false,
      priority: 'warn',
      created: Date.now() - 2000,
    },
    {
      id: 'seed-5',
      title: 'รดน้ำต้นไม้',
      done: true,
      created: Date.now() - 1000,
    },
  ] as Task[],

  stores: [
    { id: 'lotus', name: 'โลตัส', icon: 'ti-building-store' },
    { id: 'betagro', name: 'เบทาโกร', icon: 'ti-meat' },
    { id: 'fruit', name: 'ร้านผลไม้', icon: 'ti-apple' },
  ] as Store[],

  shop: [] as ShopItem[],
};
