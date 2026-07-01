import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ListingFiltersProvider } from '@/hooks/useListingFilters';
import { HomePage } from '@/pages/HomePage';
import { PropertyDetailPage } from '@/pages/PropertyDetailPage';
import { BlogPage } from '@/pages/BlogPage';
import { BlogArticlePage } from '@/pages/BlogArticlePage';
import { ComparePage } from '@/pages/ComparePage';
import { WishlistPage } from '@/pages/WishlistPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { SubmitPropertyPage } from '@/pages/SubmitPropertyPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AgentProfilePage } from '@/pages/AgentProfilePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ListingFiltersProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="properties/:slug" element={<PropertyDetailPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogArticlePage />} />
            <Route path="agents/:slug" element={<AgentProfilePage />} />
            <Route path="compare" element={<ComparePage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="submit-property" element={<SubmitPropertyPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ListingFiltersProvider>
    </BrowserRouter>
  );
}
