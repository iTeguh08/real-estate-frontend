import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AppShell } from '@/components/layout/AppShell';
import { PageLoader } from '@/components/skeletons';
import { ListingFiltersProvider } from '@/hooks/useListingFilters';
import { completeBootstrapLoader, handoffBootstrapLoader } from '@/lib/bootstrap-loader';
import { HomePage } from '@/pages/HomePage';

const PropertyDetailPage = lazy(() =>
  import('@/pages/PropertyDetailPage').then((m) => ({ default: m.PropertyDetailPage }))
);
const PropertyShowcasePage = lazy(() =>
  import('@/pages/PropertyShowcasePage').then((m) => ({ default: m.PropertyShowcasePage }))
);
const BlogPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const ArticleDetailPage = lazy(() =>
  import('@/pages/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage }))
);
const NewsPage = lazy(() => import('@/pages/NewsPage').then((m) => ({ default: m.NewsPage })));
const ComparePage = lazy(() =>
  import('@/pages/ComparePage').then((m) => ({ default: m.ComparePage }))
);
const WishlistPage = lazy(() =>
  import('@/pages/WishlistPage').then((m) => ({ default: m.WishlistPage }))
);
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() =>
  import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);
const SubmitPropertyPage = lazy(() =>
  import('@/pages/SubmitPropertyPage').then((m) => ({ default: m.SubmitPropertyPage }))
);
const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const MyListingsPage = lazy(() =>
  import('@/pages/MyListingsPage').then((m) => ({ default: m.MyListingsPage }))
);
const EditMyListingPage = lazy(() =>
  import('@/pages/EditMyListingPage').then((m) => ({ default: m.EditMyListingPage }))
);
const AgentProfilePage = lazy(() =>
  import('@/pages/AgentProfilePage').then((m) => ({ default: m.AgentProfilePage }))
);
const AgentsListingPage = lazy(() =>
  import('@/pages/AgentsListingPage').then((m) => ({ default: m.AgentsListingPage }))
);
const PropertyListingsPage = lazy(() =>
  import('@/pages/PropertyListingsPage').then((m) => ({ default: m.PropertyListingsPage }))
);
const AboutUsPage = lazy(() =>
  import('@/pages/AboutUsPage').then((m) => ({ default: m.AboutUsPage }))
);
const ContactUsPage = lazy(() =>
  import('@/pages/ContactUsPage').then((m) => ({ default: m.ContactUsPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import('@/pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

/** Hands off inline HTML preloader once route content is ready (fonts + paint). */
function BootstrapLoaderComplete() {
  useEffect(() => {
    void completeBootstrapLoader();
  }, []);
  return null;
}

function RouteFallback() {
  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => handoffBootstrapLoader()));
  }, []);

  return <PageLoader variant="route" />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ListingFiltersProvider>
        <Suspense fallback={<RouteFallback />}>
          <BootstrapLoaderComplete />
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<HomePage />} />
              <Route path="listings" element={<PropertyListingsPage />} />
              <Route path="properties/:slug" element={<PropertyDetailPage />} />
              <Route path="property/:id" element={<PropertyShowcasePage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="news/:slug" element={<ArticleDetailPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<ArticleDetailPage />} />
              <Route path="agents" element={<AgentsListingPage />} />
              <Route path="agents/:slug" element={<AgentProfilePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="about" element={<AboutUsPage />} />
              <Route path="contact" element={<ContactUsPage />} />
              <Route path="privacy" element={<PrivacyPolicyPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="compare" element={<ComparePage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="submit-property" element={<SubmitPropertyPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="dashboard/my-property" element={<MyListingsPage />} />
                <Route path="dashboard/my-property/:id" element={<EditMyListingPage />} />
                <Route path="dashboard/my-listings" element={<MyListingsPage />} />
                <Route path="dashboard/my-listings/:id/edit" element={<EditMyListingPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ListingFiltersProvider>
    </BrowserRouter>
  );
}
