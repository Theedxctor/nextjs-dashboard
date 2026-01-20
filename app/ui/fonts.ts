import { Inter, Lusitana, Bevan } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({ 
  weight: ['400', '700'],
  subsets: ['latin'] 
});
export const bevan = Bevan({
  weight: ['400'],
  style: ['italic'],
  subsets: ['latin']
})
