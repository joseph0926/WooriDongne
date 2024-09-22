'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { signUpSchema, SignUpType } from '@/lib/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FaGoogle } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { signup } from '@/actions/auth.action';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

/**
 * SignUpForm 컴포넌트입니다
 */
export function SignUpForm() {
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const submitHandler = async (values: SignUpType) => {
    const res = await signup(values);
    if (res && res.success) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="flex w-full flex-col gap-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  {...field}
                  placeholder="닉네임을 입력해주세요."
                  className="h-12 text-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  {...field}
                  placeholder="이메일을 입력해주세요."
                  className="h-12 text-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="비밀번호를 입력해주세요."
                  className="h-12 text-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} className="h-12 w-full text-lg font-bold">
          {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : '회원가입'}
        </Button>
      </form>
      <div className="flex items-center gap-2">
        <p>이미 회원이신가요?</p>
        <Link href="/sign-in" className="cursor-pointer font-semibold text-primary">
          로그인
        </Link>
      </div>
      <Separator className="h-0.5" />
      <div className="flex items-center gap-10 pb-6">
        <FaGoogle className="cursor-pointer text-4xl" />
        <RiKakaoTalkFill className="cursor-pointer text-5xl" />
        <SiNaver className="cursor-pointer text-4xl" />
      </div>
    </Form>
  );
}
