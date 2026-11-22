import { Navigate, Route, Routes } from 'react-router-dom';
import { Shell } from './components/Shell';
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import CustomerService from './screens/CustomerService';
import RequestsList from './screens/cases/RequestsList';
import CasePage from './screens/cases/CasePage';
import AgentView from './screens/cases/AgentView';
import VoiceHub from './screens/voice/VoiceHub';
import NewIdea from './screens/voice/NewIdea';
import Receipt from './screens/voice/Receipt';
import MyIdeas from './screens/voice/MyIdeas';
import IdeaDetail from './screens/voice/IdeaDetail';
import Changed from './screens/voice/Changed';
import Workbench from './screens/voice/Workbench';
import MomentsPicker from './screens/moments/MomentsPicker';
import Checklist from './screens/moments/Checklist';
import Recap from './screens/moments/Recap';

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<CustomerService />} />
        <Route path="/requests" element={<RequestsList />} />
        <Route path="/requests/:id" element={<CasePage />} />
        <Route path="/agent/:id" element={<AgentView />} />
        <Route path="/voice" element={<VoiceHub />} />
        <Route path="/voice/new" element={<NewIdea />} />
        <Route path="/voice/receipt/:id" element={<Receipt />} />
        <Route path="/voice/ideas" element={<MyIdeas />} />
        <Route path="/voice/ideas/:id" element={<IdeaDetail />} />
        <Route path="/voice/changed" element={<Changed />} />
        <Route path="/moments" element={<MomentsPicker />} />
        <Route path="/moments/:momentId" element={<Checklist />} />
        <Route path="/moments/:momentId/done" element={<Recap />} />
        <Route path="/workbench" element={<Workbench />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
