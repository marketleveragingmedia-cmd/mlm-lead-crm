import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Laying the Foundation for Success | Cash Flow Visionaries - V19',
};

export default function V19Page() {
  // Serve the static V19 HTML
  redirect('/v19/index.html');
}
