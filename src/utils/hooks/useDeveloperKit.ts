import { useState, useEffect } from 'react';
import { developerKitService, CustomEntity, ApiMigration, ApiEndpoint } from '../../services/developerKit.service';

export const useEntities = () => {
  const [entities, setEntities] = useState<CustomEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntities = async () => {
    try {
      setLoading(true);
      const data = await developerKitService.getCustomEntities();
      setEntities(data.items || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch entities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  return {
    entities,
    loading,
    error,
    refetch: fetchEntities,
  };
};

export const useMigrations = () => {
  const [migrations, setMigrations] = useState<ApiMigration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMigrations = async () => {
    try {
      setLoading(true);
      const data = await developerKitService.getMigrations();
      setMigrations(data.items || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch migrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMigrations();
  }, []);

  return {
    migrations,
    loading,
    error,
    refetch: fetchMigrations,
  };
};

export const useGeneratedEndpoints = () => {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEndpoints = async () => {
    try {
      setLoading(true);
      const data = await developerKitService.getGeneratedEndpoints();
      setEndpoints(data.items || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch endpoints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEndpoints();
  }, []);

  return {
    endpoints,
    loading,
    error,
    refetch: fetchEndpoints,
  };
};

// System health durumunu kontrol eden hook
export const useSystemHealth = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  const checkSystemHealth = async () => {
    try {
      // API'ye basit bir health check yapalım
      await developerKitService.getCustomEntities();
      setIsOnline(true);
      setLastCheck(new Date());
    } catch (error) {
      console.error('System health check failed:', error);
      setIsOnline(false);
      setLastCheck(new Date());
    }
  };

  useEffect(() => {
    // İlk kontrol
    checkSystemHealth();

    // Her 30 saniyede bir kontrol et
    const interval = setInterval(checkSystemHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    isOnline,
    lastCheck,
    recheckHealth: checkSystemHealth,
  };
};