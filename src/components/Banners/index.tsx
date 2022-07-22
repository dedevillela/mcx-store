import { useState, useEffect } from 'react';

import { api } from '../../services/api';

import { Container, BannerList } from './styles';

interface Banner {
  id: number;
  title: string;
  image: string;
}

const Banners = (): JSX.Element => {
  const [banners, setBanners] = useState<Banner[]>([]);
  
  useEffect(() => {
    async function loadBanners() {
      // Call API and get array of all banners
      const response = await api.get<Banner[]>('banners');

      const data = response.data.map((banner) => banner);

      setBanners(data);
    }

    loadBanners();
  }, []);

  return (
    <Container>
      <BannerList>
      {banners.map((banner: Banner) => (
        <li key={banner.id}>
          <img src={banner.image} alt={banner.title} title={banner.title} loading="lazy" />
        </li>
      ))}
      </BannerList>
    </Container>
  );
};

export default Banners;
