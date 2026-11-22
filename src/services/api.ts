import {
  ContactSubmission,
  DonationRecord,
  GalleryItem,
  GroundStory,
  ImpactStats,
  LocationItem,
  ProgramItem,
  VolunteerSubmission,
} from '../types';

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errMsg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body && typeof body.error === 'string') {
        errMsg = body.error;
      }
    } catch {
      // ignore JSON parse error
    }
    throw new Error(errMsg);
  }
  return res.json() as Promise<T>;
}

export const api = {
  async getStats(): Promise<ImpactStats> {
    return parseJson(await fetch('/api/stats'));
  },
  async updateStats(stats: ImpactStats): Promise<ImpactStats> {
    return parseJson(
      await fetch('/api/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats),
      })
    );
  },

  async getPrograms(): Promise<ProgramItem[]> {
    return parseJson(await fetch('/api/programs'));
  },

  async getLocations(): Promise<LocationItem[]> {
    return parseJson(await fetch('/api/locations'));
  },
  async createLocation(item: Omit<LocationItem, 'id'>): Promise<LocationItem> {
    return parseJson(
      await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
    );
  },
  async deleteLocation(id: string): Promise<{ ok: boolean }> {
    return parseJson(
      await fetch(`/api/locations/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
    );
  },

  async getGallery(): Promise<GalleryItem[]> {
    return parseJson(await fetch('/api/gallery'));
  },
  async createGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
    return parseJson(
      await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
    );
  },
  async deleteGalleryItem(id: string): Promise<{ ok: boolean }> {
    return parseJson(
      await fetch(`/api/gallery/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
    );
  },

  async getStories(): Promise<GroundStory[]> {
    return parseJson(await fetch('/api/stories'));
  },

  async getVolunteers(): Promise<VolunteerSubmission[]> {
    return parseJson(await fetch('/api/volunteers'));
  },
  async submitVolunteer(
    payload: Omit<VolunteerSubmission, 'id' | 'status' | 'submittedAt'>
  ): Promise<VolunteerSubmission> {
    return parseJson(
      await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    );
  },
  async updateVolunteerStatus(
    id: string,
    status: VolunteerSubmission['status']
  ): Promise<VolunteerSubmission> {
    return parseJson(
      await fetch(`/api/volunteers/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
    );
  },

  async getContacts(): Promise<ContactSubmission[]> {
    return parseJson(await fetch('/api/contact'));
  },
  async submitContact(
    payload: Omit<ContactSubmission, 'id' | 'status' | 'submittedAt'>
  ): Promise<ContactSubmission> {
    return parseJson(
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    );
  },
  async updateContactStatus(
    id: string,
    status: ContactSubmission['status']
  ): Promise<ContactSubmission> {
    return parseJson(
      await fetch(`/api/contact/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
    );
  },

  async getDonations(): Promise<DonationRecord[]> {
    return parseJson(await fetch('/api/donations'));
  },
  async submitDonation(
    payload: Omit<DonationRecord, 'id' | 'receiptNumber' | 'createdAt'>
  ): Promise<DonationRecord> {
    return parseJson(
      await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    );
  },

  async login(username: string, password: string): Promise<{ ok: boolean; role: string }> {
    return parseJson(
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
    );
  },
};
