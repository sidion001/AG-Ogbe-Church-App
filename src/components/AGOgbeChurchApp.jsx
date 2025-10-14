import React, { useState } from 'react';
import { Home, Book, Heart, Calendar, DollarSign, Video, MessageSquare, Users, Bell, Settings, Menu, X, Search, Share2, Bookmark, ChevronRight, Play, Send, Upload, LogIn, Church, Lock, Eye, EyeOff, Pause, BookOpen, GraduationCap, Loader, AlertCircle } from 'lucide-react';

export default function AGOgbeChurchApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const devotional = {
    date: 'September 30, 2025',
    title: 'Walking in Faith',
    scripture: 'Hebrews 11:1',
    verse: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
    reflection: 'Faith is not just believing in God, but trusting Him completely even when we cannot see the outcome.',
    prayer: 'Lord, increase my faith today. Help me to trust You completely.',
    action: 'Share your faith with someone today.'
  };

  const [prayerRequests, setPrayerRequests] = useState([
    { id: 1, content: 'Pray for my job interview tomorrow', category: 'Personal', prayers: 23, author: 'Sister Grace' },
    { id: 2, content: 'Healing for my mother who is sick', category: 'Urgent', prayers: 45, author: 'Anonymous' }
  ]);

  const events = [
    { id: 1, title: 'Sunday Worship Service', date: 'October 1, 2025', time: '8:00 AM', location: '5 Ezomo Lane' },
    { id: 2, title: 'Midweek Service', date: 'October 4, 2025', time: '5:30 PM', location: '5 Ezomo Lane' }
  ];

  const sermons = [
    { id: 1, title: 'The Power of Prayer', speaker: 'Rev. U.M. Irabor', date: 'Sept 24, 2025', plays: 234 },
    { id: 2, title: 'Living in Victory', speaker: 'Rev. Innocent Emmanuel', date: 'Sept 17, 2025', plays: 189 }
  ];

  const navigate = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const requireAuth = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const renderPage = () => {
    const props = { navigate, devotional, events, sermons, prayerRequests, setPrayerRequests, isLoggedIn, userName, requireAuth };

    switch(currentPage) {
      case 'home': return <HomePage {...props} />;
      case 'bible': return <BiblePage />;
      case 'devotional': return <DevotionalPage devotional={devotional} />;
      case 'prayer': return <PrayerWallPage {...props} />;
      case 'sermons': return <SermonsPage sermons={sermons} />;
      case 'giving': return <GivingPage {...props} />;
      case 'events': return <EventsPage events={events} />;
      case 'testimonies': return <TestimoniesPage {...props} />;
      case 'feedback': return <FeedbackPage />;
      case 'admin': return <AdminPage />;
      default: return <HomePage {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-xs text-center text-blue-900 font-bold">
                <div className="text-sm">AG</div>
                <div className="text-[8px]">OGBE</div>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-base">AG Ogbe Church</h1>
              <p className="text-[10px] text-blue-200">Assemblies of God</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isLoggedIn ? (
              <button onClick={() => setShowAuthModal(true)} className="text-xs bg-white text-blue-900 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1">
                <LogIn size={14} /> Login
              </button>
            ) : (
              <div className="text-xs bg-blue-800 px-3 py-1.5 rounded-lg">Hi, {userName}</div>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-72 h-full shadow-2xl p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-2">
              <MenuButton icon={Home} label="Home" onClick={() => navigate('home')} />
              <MenuButton icon={BookOpen} label="Bible Reader" onClick={() => navigate('bible')} />
              <MenuButton icon={Heart} label="Daily Devotional" onClick={() => navigate('devotional')} />
              <MenuButton icon={MessageSquare} label="Prayer Wall" onClick={() => navigate('prayer')} />
              <MenuButton icon={Video} label="Sermons" onClick={() => navigate('sermons')} />
              <MenuButton icon={DollarSign} label="Give" onClick={() => navigate('giving')} />
              <MenuButton icon={Calendar} label="Events" onClick={() => navigate('events')} />
              <MenuButton icon={Users} label="Testimonies" onClick={() => navigate('testimonies')} />
              <MenuButton icon={MessageSquare} label="Feedback" onClick={() => navigate('feedback')} />
              <div className="border-t pt-4 mt-4">
                <MenuButton icon={Settings} label="Admin Dashboard" onClick={() => navigate('admin')} />
              </div>
            </nav>
          </div>
        </div>
      )}

      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          setMode={setAuthMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={(name) => {
            setIsLoggedIn(true);
            setUserName(name);
            setShowAuthModal(false);
          }}
        />
      )}

      <main className="container mx-auto px-4 py-6 pb-24">
        {renderPage()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t z-40">
        <div className="container mx-auto px-2 py-2 flex justify-around">
          <NavButton icon={Home} label="Home" active={currentPage === 'home'} onClick={() => navigate('home')} />
          <NavButton icon={BookOpen} label="Bible" active={currentPage === 'bible'} onClick={() => navigate('bible')} />
          <NavButton icon={MessageSquare} label="Prayer" active={currentPage === 'prayer'} onClick={() => navigate('prayer')} />
          <NavButton icon={Video} label="Sermons" active={currentPage === 'sermons'} onClick={() => navigate('sermons')} />
          <NavButton icon={Menu} label="More" onClick={() => setIsMenuOpen(true)} />
        </div>
      </nav>
    </div>
  );
}

function AuthModal({ mode, setMode, onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (mode === 'signup' && !name.trim()) newErrors.name = 'Name required';
    if (!email.trim()) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
    if (!password) newErrors.password = 'Password required';
    else if (password.length < 6) newErrors.password = 'Min 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSuccess(mode === 'login' ? email.split('@')[0] : name);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">
            {mode === 'login' ? 'Welcome Back!' : 'Join AG Ogbe'}
          </h2>
          <button onClick={onClose} className="text-gray-400"><X size={24} /></button>
        </div>

        <div className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors({...errors, name: ''}); }}
                placeholder="John Doe"
                className={`w-full p-3 border rounded-lg outline-none ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors({...errors, email: ''}); }}
              placeholder="your@email.com"
              className={`w-full p-3 border rounded-lg outline-none ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors({...errors, password: ''}); }}
                placeholder="Enter password"
                className={`w-full p-3 border rounded-lg outline-none pr-10 ${errors.password ? 'border-red-500' : ''}`}
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button onClick={handleSubmit} className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>

          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}); }} className="text-sm text-blue-900 font-semibold w-full">
            {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuButton({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition">
      <Icon size={20} className="text-blue-900" />
      <span className="text-gray-700">{label}</span>
    </button>
  );
}

function NavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 transition ${active ? 'text-blue-900' : 'text-gray-400'}`}>
      <Icon size={22} />
      <span className="text-xs">{label}</span>
    </button>
  );
}

function HomePage({ navigate, devotional, events, isLoggedIn, userName }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <Church size={40} />
          <div>
            <h2 className="text-2xl font-bold">{isLoggedIn ? `Welcome, ${userName}!` : 'Welcome to AG Ogbe!'}</h2>
            <p className="text-blue-200 text-sm">Where Jesus is Lord</p>
          </div>
        </div>
        <p className="text-sm opacity-90">5 Ezomo Lane, Off Plymouth Road</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500">
        <p className="text-xs text-gray-500 mb-2">VERSE OF THE DAY</p>
        <p className="text-sm font-semibold text-blue-900 mb-2">{devotional.scripture}</p>
        <p className="text-gray-700 italic">{devotional.verse}</p>
        <button onClick={() => navigate('devotional')} className="mt-4 text-blue-900 text-sm font-semibold flex items-center gap-2">
          Read Full Devotional <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <QuickAction icon={Heart} label="Prayer Wall" color="bg-red-500" onClick={() => navigate('prayer')} />
        <QuickAction icon={DollarSign} label="Give" color="bg-green-500" onClick={() => navigate('giving')} />
        <QuickAction icon={Video} label="Sermons" color="bg-purple-500" onClick={() => navigate('sermons')} />
        <QuickAction icon={GraduationCap} label="Sunday School" color="bg-blue-500" onClick={() => navigate('admin')} />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-lg mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.map(event => (
            <div key={event.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold text-gray-800">{event.title}</p>
              <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, color, onClick }) {
  return (
    <button onClick={onClick} className={`${color} text-white rounded-xl p-6 shadow-lg hover:scale-105 transition flex flex-col items-center gap-2`}>
      <Icon size={32} />
      <span className="font-semibold">{label}</span>
    </button>
  );
}

function BiblePage() {
  const [selectedBook, setSelectedBook] = useState('');
  const books = ['Genesis', 'Exodus', 'Matthew', 'Mark', 'Luke', 'John', 'Romans', 'Psalms'];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Holy Bible</h2>
        <div className="grid grid-cols-2 gap-2">
          {books.map(book => (
            <button key={book} onClick={() => setSelectedBook(book)} className="p-3 bg-gray-50 hover:bg-blue-100 rounded-lg font-semibold">
              {book}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DevotionalPage({ devotional }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-4">{devotional.title}</h2>
        <p className="text-sm opacity-90">{devotional.scripture}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <p className="text-gray-700 italic mb-4">{devotional.verse}</p>
        <h3 className="font-bold text-lg mb-3">Reflection</h3>
        <p className="text-gray-700">{devotional.reflection}</p>
      </div>
    </div>
  );
}

function PrayerWallPage({ prayerRequests, setPrayerRequests, isLoggedIn, requireAuth }) {
  const [newRequest, setNewRequest] = useState('');

  const handleSubmit = () => {
    if (!requireAuth()) return;
    if (!newRequest.trim()) return;
    setPrayerRequests([{ id: Date.now(), content: newRequest, category: 'Personal', prayers: 0, author: 'You' }, ...prayerRequests]);
    setNewRequest('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Prayer Wall</h2>
        <textarea
          value={newRequest}
          onChange={(e) => setNewRequest(e.target.value)}
          placeholder="Share your prayer request..."
          className="w-full p-4 border rounded-lg mb-3"
          rows="4"
        />
        <button onClick={handleSubmit} className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold">
          Submit Prayer Request
        </button>
      </div>

      <div className="space-y-4">
        {prayerRequests.map(request => (
          <div key={request.id} className="bg-white rounded-xl p-5 shadow-lg">
            <p className="font-semibold text-sm text-gray-600 mb-2">{request.author}</p>
            <p className="text-gray-800 mb-4">{request.content}</p>
            <button className="text-blue-900 font-semibold">
              <Heart size={18} className="inline mr-2" />
              {request.prayers} people prayed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SermonsPage({ sermons }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Sermon Archive</h2>
      </div>

      <div className="space-y-4">
        {sermons.map(sermon => (
          <div key={sermon.id} className="bg-white rounded-xl p-5 shadow-lg">
            <h3 className="font-bold text-lg mb-1">{sermon.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{sermon.speaker}</p>
            <button className="text-blue-900 font-semibold text-sm">Play Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GivingPage({ isLoggedIn, requireAuth }) {
  const [amount, setAmount] = useState('');
  const [showBankDetails, setShowBankDetails] = useState(false);
  
  // Admin will update these through admin dashboard
  const bankDetails = {
    bankName: 'Access Bank',
    accountName: 'Assemblies of God Ogbe Branch',
    accountNumber: '0123456789',
    note: 'Please use your name as reference and send confirmation to church office'
  };

  const handleProceed = () => {
    if (!amount || parseInt(amount) < 100) {
      alert('Please enter a valid amount (minimum ₦100)');
      return;
    }
    setShowBankDetails(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Give Cheerfully</h2>
        <p className="text-sm opacity-90">God loves a cheerful giver - 2 Corinthians 9:7</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-lg mb-4">Select Giving Type</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {['Tithes', 'Offerings', 'Projects', 'Missions'].map(cat => (
            <button key={cat} className="p-4 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-green-50 transition">
              {cat}
            </button>
          ))}
        </div>

        <label className="block text-sm font-semibold mb-2 text-gray-700">Amount (₦)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-4 border-2 rounded-lg text-lg mb-4 focus:border-green-500 outline-none"
          min="100"
        />

        <div className="grid grid-cols-3 gap-2 mb-6">
          {[1000, 5000, 10000].map(amt => (
            <button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              className="py-3 bg-gray-100 rounded-lg font-semibold text-gray-700 hover:bg-green-100 transition"
            >
              ₦{amt.toLocaleString()}
            </button>
          ))}
        </div>

        <button 
          onClick={handleProceed}
          className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-lg"
        >
          View Bank Details
        </button>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mt-4">
          <p className="text-xs text-gray-700">
            <Lock size={12} className="inline mr-1" />
            Bank details are managed by church admin. After deployment, Paystack integration can be added optionally.
          </p>
        </div>
      </div>

      {showBankDetails && (
        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-green-500 animate-fadeIn">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-green-700">
            <DollarSign size={24} />
            Bank Transfer Details
          </h3>
          
          <div className="space-y-4 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-sm text-gray-600 font-semibold">Bank Name:</span>
              <span className="text-base font-bold text-gray-800">{bankDetails.bankName}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-sm text-gray-600 font-semibold">Account Name:</span>
              <span className="text-base font-bold text-gray-800">{bankDetails.accountName}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-sm text-gray-600 font-semibold">Account Number:</span>
              <span className="text-2xl font-bold text-green-700">{bankDetails.accountNumber}</span>
            </div>
            
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
              <span className="text-sm text-gray-600 font-semibold">Amount to Transfer:</span>
              <span className="text-3xl font-bold text-green-600">₦{parseInt(amount).toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mt-4">
            <p className="text-sm text-gray-700 font-semibold mb-2">📝 Important Note:</p>
            <p className="text-xs text-gray-600">{bankDetails.note}</p>
          </div>

          <button 
            onClick={() => setShowBankDetails(false)}
            className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-lg mb-4">Active Projects</h3>
        {[
          { name: 'Church Bus Project', raised: 650000, goal: 1000000 },
          { name: 'Mission Trip to Niger', raised: 180000, goal: 250000 }
        ].map((project, idx) => {
          const percentage = (project.raised / project.goal) * 100;
          return (
            <div key={idx} className="mb-6 last:mb-0">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">{project.name}</span>
                <span className="text-sm font-bold text-green-600">{Math.round(percentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>₦{project.raised.toLocaleString()} raised</span>
                <span>Goal: ₦{project.goal.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventsPage({ events }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Church Events</h2>
      </div>

      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimoniesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900">Testimonies</h2>
        <textarea placeholder="Share your testimony..." className="w-full p-4 border rounded-lg my-4" rows="4" />
        <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">Submit</button>
      </div>
    </div>
  );
}

function FeedbackPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900">Feedback</h2>
        <textarea placeholder="Your feedback..." className="w-full p-4 border rounded-lg my-4" rows="6" />
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">Submit</button>
      </div>
    </div>
  );
}

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingBank, setEditingBank] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    bankName: 'Access Bank',
    accountName: 'Assemblies of God Ogbe Branch',
    accountNumber: '0123456789',
    note: 'Please use your name as reference'
  });

  if (!isLoggedIn) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <Lock size={48} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
        <input type="password" placeholder="Admin Password" className="w-full p-4 border rounded-lg mb-4" />
        <button onClick={() => setIsLoggedIn(true)} className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-sm opacity-75">Manage church app settings</p>
      </div>

      {/* Bank Details Management */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <DollarSign className="text-green-600" />
            Giving Bank Details
          </h3>
          <button 
            onClick={() => setEditingBank(!editingBank)}
            className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            {editingBank ? 'Save' : 'Edit'}
          </button>
        </div>

        {editingBank ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Bank Name</label>
              <input
                type="text"
                value={bankInfo.bankName}
                onChange={(e) => setBankInfo({...bankInfo, bankName: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Account Name</label>
              <input
                type="text"
                value={bankInfo.accountName}
                onChange={(e) => setBankInfo({...bankInfo, accountName: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Account Number</label>
              <input
                type="text"
                value={bankInfo.accountNumber}
                onChange={(e) => setBankInfo({...bankInfo, accountNumber: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Note to Members</label>
              <textarea
                value={bankInfo.note}
                onChange={(e) => setBankInfo({...bankInfo, note: e.target.value})}
                className="w-full p-3 border rounded-lg"
                rows="2"
              />
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-xs text-gray-700">
                ✅ After deployment: These details will be saved to database and shown to members on Giving page
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p className="text-sm"><span className="font-semibold">Bank:</span> {bankInfo.bankName}</p>
            <p className="text-sm"><span className="font-semibold">Account:</span> {bankInfo.accountName}</p>
            <p className="text-sm"><span className="font-semibold">Number:</span> {bankInfo.accountNumber}</p>
            <p className="text-xs text-gray-600 italic">{bankInfo.note}</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-3xl font-bold text-blue-900">324</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600">Prayer Requests</p>
          <p className="text-3xl font-bold text-red-600">47</p>
        </div>
      </div>

      {/* Church Info */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Church className="text-blue-900" />
          Church Information
        </h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
            <span className="font-semibold">Upload Church Logo</span>
          </button>
          <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
            <span className="font-semibold">Update Pastor Photos</span>
          </button>
          <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
            <span className="font-semibold">Edit Church Address</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-blue-500 text-white rounded-xl font-semibold">
            Send Notice
          </button>
          <button className="p-4 bg-green-500 text-white rounded-xl font-semibold">
            Add Event
          </button>
          <button className="p-4 bg-purple-500 text-white rounded-xl font-semibold">
            Upload Sermon
          </button>
          <button className="p-4 bg-orange-500 text-white rounded-xl font-semibold">
            Manage Users
          </button>
        </div>
      </div>

      <button onClick={() => setIsLoggedIn(false)} className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold">
        Logout
      </button>
    </div>
  );
}