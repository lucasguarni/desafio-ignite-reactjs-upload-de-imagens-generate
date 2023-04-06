import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async () => {
    const { data } = await api.get('/api/images');
    return {data: data.data, after: data.after };
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages,
    {
      getNextPageParam: (lastPage) => lastPage.after
    }
  );

  const formattedData = useMemo(() => {
    const images = data?.pages.flatMap(image => {
      return image.data.flat();
    });

    return images;
  }, [data]);
 
  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />
  }
  
  // TODO RENDER LOADING SCREEN
  if (isLoading || isFetchingNextPage) {
    return <Loading />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && <Button onClick={() => fetchNextPage}>Load more</Button>}
      </Box>
    </>
  );
}
