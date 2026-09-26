import { masterclassStyles, masterclassBody } from '@/lib/masterclass-html';

export const metadata = {
  title: 'Cash Flow Injection Strategy Masterclass | Official Draft V15',
};

export default function MasterclassPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: masterclassStyles }} />
      <div dangerouslySetInnerHTML={{ __html: masterclassBody }} />
    </>
  );
}
