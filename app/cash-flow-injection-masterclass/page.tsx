import { masterclassStyles, masterclassBody } from '@/lib/masterclass-html';
import MasterclassClient from './MasterclassClient';

export const metadata = {
  title: 'Cash Flow Injection Strategy Masterclass | Official Draft V15',
};

export default function MasterclassPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: masterclassStyles }} />
      <MasterclassClient html={masterclassBody} />
    </>
  );
}
