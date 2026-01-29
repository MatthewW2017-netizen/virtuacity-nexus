import { supabase } from './supabase';
import { Node, District, Stream, Message } from '@/types/chat';

export const dataService = {
  async fetchCities(): Promise<Node[]> {
    const { data: cities, error } = await supabase
      .from('cities')
      .select(`
        *,
        districts (*),
        streams (*)
      `);

    if (error) {
      console.error('Error fetching cities:', error);
      return [];
    }

    return (cities || []).map(city => ({
      ...city,
      hexColor: city.hex_color,
      ownerId: city.owner_id,
      orbitingStreams: city.streams?.map((s: any) => s.id) || [],
      activeModules: city.active_modules || [],
      districts: city.districts || [],
      streams: city.streams || []
    }));
  },

  async createCity(cityData: Partial<Node>, userId: string): Promise<Node | null> {
    const { data: city, error } = await supabase
      .from('cities')
      .insert({
        name: cityData.name,
        category: cityData.category,
        atmosphere: cityData.atmosphere,
        hex_color: cityData.hexColor,
        icon: cityData.icon,
        owner_id: userId,
        status: 'online',
        x: Math.random() * 1000,
        y: Math.random() * 1000
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating city:', error);
      return null;
    }

    // Create default districts
    const { data: districts, error: dError } = await supabase
      .from('districts')
      .insert([
        { city_id: city.id, name: 'Central Core', type: 'neural', occupancy: 0 },
        { city_id: city.id, name: 'Data Nexus', type: 'industrial', occupancy: 0 }
      ])
      .select();

    if (dError) {
      console.error('Error creating districts:', dError);
    }

    return {
      ...city,
      hexColor: city.hex_color,
      ownerId: city.owner_id,
      districts: districts || [],
      streams: [],
      activeModules: [],
      orbitingStreams: []
    };
  },

  async updateCity(cityId: string, updates: Partial<Node>): Promise<boolean> {
    const { error } = await supabase
      .from('cities')
      .update({
        name: updates.name,
        category: updates.category,
        atmosphere: updates.atmosphere,
        hex_color: updates.hexColor,
        icon: updates.icon,
        status: updates.status
      })
      .eq('id', cityId);

    if (error) {
      console.error('Error updating city:', error);
      return false;
    }
    return true;
  },

  async createDistrict(cityId: string, districtData: Partial<District>): Promise<District | null> {
    const { data, error } = await supabase
      .from('districts')
      .insert({
        city_id: cityId,
        name: districtData.name,
        type: districtData.type || 'neural',
        occupancy: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating district:', error);
      return null;
    }
    return data;
  },

  async updateCityLogic(cityId: string, logic: any) {
    const { error } = await supabase
      .from('cities')
      .update({ logic })
      .eq('id', cityId);

    if (error) {
      console.error('Error updating city logic:', error);
    }
  },

  async createStream(cityId: string, name: string): Promise<Stream | null> {
    const { data: stream, error } = await supabase
      .from('streams')
      .insert({
        node_id: cityId,
        name: name,
        type: 'living-thread',
        last_activity_at: new Date().toISOString(),
        modules: []
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating stream:', error);
      return null;
    }

    return stream;
  },

  async fetchMessages(streamId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('stream_id', streamId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return (data || []).map(m => ({
      ...m,
      timestamp: m.created_at,
      authorId: m.sender_id,
      streamId: m.stream_id
    }));
  },

  async sendMessage(message: Partial<Message>): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        stream_id: message.streamId,
        sender_id: message.authorId,
        content: message.content,
        type: message.type || 'text',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return null;
    }

    return {
      ...data,
      timestamp: data.created_at,
      authorId: data.sender_id,
      streamId: data.stream_id
    };
  },

  async logSystemEvent(level: 'info' | 'warn' | 'error' | 'fatal', source: string, message: string, details?: any) {
    // Attempt to log to a dedicated table, fallback to console if table doesn't exist yet
    try {
      const { error } = await supabase
        .from('system_logs')
        .insert({
          level,
          source,
          message,
          details,
          timestamp: new Date().toISOString()
        });
      
      if (error) throw error;
    } catch (err) {
      console.warn(`[${level.toUpperCase()}] ${source}: ${message}`, details || '');
    }
  },

  async fetchSystemUpdates(): Promise<any[]> {
    const { data, error } = await supabase
      .from('system_updates')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching system updates:', error);
      return [];
    }
    return data || [];
  },

  async createSystemUpdate(type: 'feature' | 'fix' | 'security', title: string, description: string) {
    const { error } = await supabase
      .from('system_updates')
      .insert({ type, title, description, created_at: new Date().toISOString() });

    if (error) {
      console.error('Error creating system update:', error);
    }
  }
};
