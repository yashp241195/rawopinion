import React, {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const AboutPage = lazy(() => import('./pages/HelpPages/AboutPage'));
const CenterPage = lazy(() => import('./pages/HelpPages/CenterPage'));
const PrivacyPage = lazy(() => import('./pages/HelpPages/PrivacyPage'));
const FAQPage = lazy(() => import('./pages/HelpPages/FAQPage'));
const TermsPage = lazy(() => import('./pages/HelpPages/TermsPage'));

const AddPage = lazy(() => import('./pages/AddPage'));
const PostPage = lazy(() => import('./pages/PostPage'));
const PublicPostPage = lazy(()=>import('./pages/PublicPostPage'));

const AccountPage = lazy(() => import('./pages/AccountPage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));

const HelpPage = lazy(() => import('./pages/HelpPage'));
const MessagePage = lazy(() => import('./pages/MessagePage'));
const NotificationPage = lazy(() => import('./pages/NotificationPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));

const ProfileShowPage = lazy(() => import('./pages/ProfilePages/ProfileShowPage'));
const ProfileViewPage = lazy(() => import('./pages/ProfilePages/ProfileViewPage'));
const ConnectionPage = lazy(() => import('./pages/ProfilePages/ConnectionPage'));


const EditProfilePage = lazy(() => import('./pages/ProfilePages/EditProfilePage'));
const SettingsPage = lazy(() => import('./pages/ProfilePages/SettingsPage'));

const ProfileOptionPage = lazy(() => import('./pages/ProfilePages/ProfileOptionPage'));

const EmailVerifyPage = lazy(() => import('./pages/AccountPages/EmailVerifyPage'));
const PasswordForgotPage = lazy(() => import('./pages/AccountPages/PasswordForgotPage'));
const PasswordResetPage = lazy(() => import('./pages/AccountPages/PasswordResetPage'));

const BannedPage = lazy(() => import('./pages/AccountPages/BannedPage'));
const DeactivatedPage = lazy(() => import('./pages/AccountPages/DeactivatedPage'));


const fallbackComponent = () => 
      <div style={{display:"flex", justifyContent:"center", width:"100%", height:"100vh", }}>
        <div style={{ display:"flex", justifyContent:"center", flexDirection:"column",}} >
          <CircularProgress />
        </div>
      </div>

function App() {

  return (
    <div>
      <Suspense fallback={fallbackComponent()}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/explore/:section/:option/:pageNo" element={<ExplorePage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/add/edit/:postId" element={<AddPage />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/post/:postId/:commentId" element={<PostPage />} />
            <Route path="/post/public/:postId" element={<PublicPostPage />} />
            <Route path="/post/public/:postId/:commentId" element={<PublicPostPage />} />
            <Route path="/message/:username" element={<MessagePage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} >
              <Route path="options" element={<ProfileOptionPage />} />
              <Route path="show" element={<ProfileShowPage />} />
              <Route path="show/:option" element={<ProfileShowPage />} />
              <Route path="show/:option/:pageNo" element={<ProfileShowPage />} />
              <Route path="view/:username" element={<ProfileViewPage />} />
              <Route path="view/:username/:option" element={<ProfileViewPage />} />
              <Route path="view/:username/:option/:pageNo" element={<ProfileViewPage />} />
              <Route path="connections/:option/:pageNo" element={<ConnectionPage />} />
              <Route path="user/edit/profile" element={<EditProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="/account" element={<AccountPage />}>
              <Route path="verify/email/:token" element={<EmailVerifyPage />} />
              <Route path="password/forgot" element={<PasswordForgotPage />} />
              <Route path="password/reset/:token" element={<PasswordResetPage />} />
              <Route path="banned" element={<BannedPage />} />
              <Route path="deactivated" element={<DeactivatedPage />} />
            </Route>
            <Route path="/help" element={<HelpPage />}>
              <Route path="about" element={<AboutPage />} />
              <Route path="center" element={<CenterPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="faqs" element={<FAQPage />} />
              <Route path="terms" element={<TermsPage />} />
            </Route>
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App
