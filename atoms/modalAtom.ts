import { Movie, Products } from '@/typings';
import {DocumentData} from 'firebase/firestore';
import { atom } from 'recoil';

export const modelState = atom({
    key: 'modalState',
    default: false
});

export const movieState = atom<Movie | DocumentData | null>({
    key: 'movieState',
    default: null
})

export const plansState: Products[] = [
  {
    key: 'S',
    planName: 'Standard',
    price: 200,
    videoQuality: 'Good',
    devices: 'No',
    resolution: '480 p',
  },
  {
    key: 'P',
    planName: 'Premium',
    price: 400,
    videoQuality: 'Better',
    devices: 'Yes',
    resolution: '720 p',
  },
  {
    key: 'U',
    planName: 'Ultimate',
    price: 800,
    videoQuality: 'Best',
    devices: 'No',
    resolution: '1080 p',
  }
]