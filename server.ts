import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  INITIAL_GALLERY,
  INITIAL_LOCATIONS,
  INITIAL_PROGRAMS,
  INITIAL_STATS,
  INITIAL_STORIES,
} from './src/data/initialData';
import type {
  ContactSubmission,
  DonationRecord,
  GalleryItem,
  GroundStory,
  ImpactStats,
  LocationItem,
  ProgramItem,
  VolunteerSubmission,
} from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DatabaseState {
  stats: ImpactStats;
  locations: LocationItem[];
  programs: ProgramItem[];
  gallery: GalleryItem[];
  stories: GroundStory[];
  volunteers: VolunteerSubmission[];
  contacts: ContactSubmission[];
  donations: DonationRecord[];
}

const DATA_DIR = path.resolve(__dirname, '.data');
const DB_FILE = path.join(DATA_DIR, 'ardash_db.json');

function createDefaultState(): DatabaseState {
  return {
    stats: { ...INITIAL_STATS },
    locations: [...INITIAL_LOCATIONS],
    programs: [...INITIAL_PROGRAMS],
    gallery: [...INITIAL_GALLERY],
    stories: [...INITIAL_STORIES],
    volunteers: [
      {
        id: 'vol-seed-1',
        fullName: 'Savitri Murmu',
        email: 'savitri.murmu@example.org',
        mobileNumber: '+91 94371 55021',
        state: 'Jharkhand',
        district: 'East Singhbhum',
        areaOfInterest: 'Rural Education & Children Study Circles',
        message: 'Fluent in Santhali and Hindi. Experienced in teaching early primary grades.',
        status: 'approved',
        submittedAt: '2026-10-22T09:30:00.000Z',
      },
    ],
    contacts: [
      {
        id: 'con-seed-1',
        name: 'Dr. Rameshwar Mahato',
        email: 'r.mahato@example.org',
        phone: '+91 98351 44019',
        subject: 'Rural Health Camp Request',
        message: 'Requesting a mobile diagnostic & anemia screening camp for Chakulia block hamlets.',
        status: 'unread',
        submittedAt: '2026-10-25T11:15:00.000Z',
      },
    ],
    donations: [
      {
        id: 'don-seed-1',
        receiptNumber: 'ARDASH-2026-8412',
        donorName: 'Ananya Patnaik',
        email: 'ananya.p@example.org',
        phone: '+91 94370 88120',
        cause: 'Support Rural Education',
        amount: 2500,
        frequency: 'one-time',
        paymentMethod: 'UPI',
        createdAt: '2026-10-24T14:20:00.000Z',
      },
    ],
  };
}

function loadDatabase(): DatabaseState {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      const parsed = JSON.parse(raw) as DatabaseState;
      return {
        ...createDefaultState(),
        ...parsed,
      };
    }
  } catch (err) {
    console.warn('Failed to load persisted DB file, using default seed:', err);
  }
  return createDefaultState();
}

function saveDatabase(state: DatabaseState): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.warn('Could not persist database file:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  let db = loadDatabase();

  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'ARDASH FOUNDATION API' });
  });

  app.get('/api/stats', (_req, res) => {
    res.json(db.stats);
  });

  app.put('/api/stats', (req, res) => {
    const body = req.body as Partial<ImpactStats>;
    db.stats = {
      villagesReached: Number(body.villagesReached ?? db.stats.villagesReached),
      peopleSupported: Number(body.peopleSupported ?? db.stats.peopleSupported),
      childrenReached: Number(body.childrenReached ?? db.stats.childrenReached),
      awarenessPrograms: Number(body.awarenessPrograms ?? db.stats.awarenessPrograms),
      womenEmpowered: Number(body.womenEmpowered ?? db.stats.womenEmpowered),
      volunteers: Number(body.volunteers ?? db.stats.volunteers),
      lastUpdated: new Date().toISOString().slice(0, 10),
    };
    saveDatabase(db);
    res.json(db.stats);
  });

  app.get('/api/programs', (_req, res) => {
    res.json(db.programs);
  });

  app.get('/api/locations', (_req, res) => {
    res.json(db.locations);
  });

  app.post('/api/locations', (req, res) => {
    const body = req.body as Omit<LocationItem, 'id'>;
    if (!body.name || !body.city) {
      res.status(400).json({ error: 'Office name and city are required.' });
      return;
    }
    const created: LocationItem = {
      ...body,
      id: `loc-${Date.now()}`,
      type: body.type || 'regional',
      lat: Number(body.lat) || 20.35,
      lng: Number(body.lng) || 85.81,
    };
    db.locations.push(created);
    saveDatabase(db);
    res.status(201).json(created);
  });

  app.delete('/api/locations/:id', (req, res) => {
    db.locations = db.locations.filter((loc) => loc.id !== req.params.id);
    saveDatabase(db);
    res.json({ ok: true });
  });

  app.get('/api/gallery', (_req, res) => {
    res.json(db.gallery);
  });

  app.post('/api/gallery', (req, res) => {
    const body = req.body as Omit<GalleryItem, 'id'>;
    if (!body.title) {
      res.status(400).json({ error: 'Gallery item title is required.' });
      return;
    }
    const created: GalleryItem = {
      ...body,
      id: `gal-${Date.now()}`,
      date: body.date || 'Recent',
      location: body.location || 'Jharkhand & Odisha',
    };
    db.gallery.unshift(created);
    saveDatabase(db);
    res.status(201).json(created);
  });

  app.delete('/api/gallery/:id', (req, res) => {
    db.gallery = db.gallery.filter((item) => item.id !== req.params.id);
    saveDatabase(db);
    res.json({ ok: true });
  });

  app.get('/api/stories', (_req, res) => {
    res.json(db.stories);
  });

  app.get('/api/volunteers', (_req, res) => {
    res.json(db.volunteers);
  });

  app.post('/api/volunteers', (req, res) => {
    const body = req.body as Omit<VolunteerSubmission, 'id' | 'status' | 'submittedAt'>;
    if (!body.fullName || !body.email || !body.mobileNumber) {
      res.status(400).json({ error: 'Full name, email, and mobile number are required.' });
      return;
    }
    const created: VolunteerSubmission = {
      ...body,
      id: `vol-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    db.volunteers.unshift(created);
    db.stats.volunteers += 1;
    saveDatabase(db);
    res.status(201).json(created);
  });

  app.patch('/api/volunteers/:id', (req, res) => {
    const { status } = req.body as { status: VolunteerSubmission['status'] };
    const found = db.volunteers.find((v) => v.id === req.params.id);
    if (!found) {
      res.status(404).json({ error: 'Volunteer record not found.' });
      return;
    }
    found.status = status;
    saveDatabase(db);
    res.json(found);
  });

  app.get('/api/contact', (_req, res) => {
    res.json(db.contacts);
  });

  app.post('/api/contact', (req, res) => {
    const body = req.body as Omit<ContactSubmission, 'id' | 'status' | 'submittedAt'>;
    if (!body.name || !body.email || !body.message) {
      res.status(400).json({ error: 'Name, email, and message are required.' });
      return;
    }
    const created: ContactSubmission = {
      ...body,
      id: `con-${Date.now()}`,
      status: 'unread',
      submittedAt: new Date().toISOString(),
    };
    db.contacts.unshift(created);
    saveDatabase(db);
    res.status(201).json(created);
  });

  app.patch('/api/contact/:id', (req, res) => {
    const { status } = req.body as { status: ContactSubmission['status'] };
    const found = db.contacts.find((c) => c.id === req.params.id);
    if (!found) {
      res.status(404).json({ error: 'Contact submission not found.' });
      return;
    }
    found.status = status;
    saveDatabase(db);
    res.json(found);
  });

  app.get('/api/donations', (_req, res) => {
    res.json(db.donations);
  });

  app.post('/api/donations', (req, res) => {
    const body = req.body as Omit<DonationRecord, 'id' | 'receiptNumber' | 'createdAt'>;
    if (!body.donorName || !body.email || !body.amount || Number(body.amount) <= 0) {
      res.status(400).json({ error: 'Valid donor name, email, and amount are required.' });
      return;
    }
    const receiptSeq = Math.floor(1000 + Math.random() * 9000);
    const created: DonationRecord = {
      ...body,
      amount: Number(body.amount),
      id: `don-${Date.now()}`,
      receiptNumber: `ARDASH-2026-${receiptSeq}`,
      createdAt: new Date().toISOString(),
    };
    db.donations.unshift(created);
    saveDatabase(db);
    res.status(201).json(created);
  });

  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body as { username?: string; password?: string };
    if (username === 'admin' && password === 'ardash2026!') {
      res.json({ ok: true, role: 'directorate' });
      return;
    }
    res.status(401).json({ error: 'Invalid directorate credentials.' });
  });

  app.post('/api/reset-data', (_req, res) => {
    db = createDefaultState();
    saveDatabase(db);
    res.json({ ok: true });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ARDASH FOUNDATION server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
