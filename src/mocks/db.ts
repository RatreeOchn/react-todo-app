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
      created: Date.now() - 4000,
    },
    {
      id: 'seed-2',
      title: 'ตากผ้า',
      done: false,
      remindIn: 15,
      note: 'เครื่องปั่นแห้งใกล้เสร็จ',
      created: Date.now() - 3000,
    },
    {
      id: 'seed-3',
      title: 'ส่งงานวิชาประวัติศาสตร์',
      done: false,
      priority: 'warn',
      created: Date.now() - 2000,
    },
    {
      id: 'seed-4',
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

  shop: [
    { id: 'i1', name: 'น้ำตาล', qty: '1 กก', store: 'lotus', done: false },
    { id: 'i2', name: 'น้ำปลา', qty: '', store: 'lotus', done: false },
    { id: 'i3', name: 'หมูสับ', qty: '2 กก', store: 'betagro', done: true },
    { id: 'i4', name: 'ไข่ไก่', qty: '2 แผง', store: 'betagro', done: false },
    { id: 'i5', name: 'ส้ม', qty: '1 กก', store: 'fruit', done: false },
    { id: 'i6', name: 'นม UHT', qty: '', store: null, done: false },
  ] as ShopItem[],
};
