import { DashboardLayout } from './components/layout/DashboardLayout';
import { AuthProvider } from './lib/auth';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthProvider>
  );
}