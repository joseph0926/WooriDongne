import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'WooriDongne',
  description:
    '우리동네는 지역 기반 커뮤니티 플랫폼으로, 이웃 간의 소통을 촉진하고 지역 사회의 활성화에 기여하는 것을 목표로 합니다. 사용자는 자신의 거주지를 기반으로 한 커뮤니티에 참여하여 이웃들과 정보를 공유하고, 중고 거래, 이벤트 참여 등 다양한 활동을 즐길 수 있습니다.',
  icons: {
    icon: '/logo-no-text.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn(pretendard.className, 'antialiased')}>{children}</body>
    </html>
  );
}
