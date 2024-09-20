import React, { useState, useEffect, useMemo } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import Grid from '@mui/material/Grid';
import Senderslist from '../../components/Message/Senderslist';
import Conversation from '../../components/Message/Conversation';
import { useParams } from 'react-router-dom';
import { createClient } from 'graphql-sse';
import { APP_BACKEND } from './../../config/config';

const Message = () => {

  const [width] = useWindowSize();
  const { username } = useParams();

  const getFromLocal = (key) => JSON.parse(localStorage.getItem(key));

  const [messages, setMessages] = useState([]);

  const client = useMemo(
    () =>
      createClient({
        url: `${APP_BACKEND}/graphql/stream`,
        headers: {
          Authorization: `Bearer ${getFromLocal('auth').token}`,
        },
      }),
    []
  );

  useEffect(() => {
    
    let isMounted = true; // Track component mount state
    let subscription; // Hold the subscription to clean it up later

    const subscribe = async () => {
      try {
        subscription = client.iterate({
          query: `
            subscription {
              newMessages {
                content {
                  message
                }
                sender
                receiver
                timestamp
              }
            }
          `,
        });

        for await (const event of subscription) {
          if (isMounted && event.data && event.data.newMessages) {
            setMessages((prevMessages) => [...prevMessages, event.data.newMessages]);
          }
        }
      } catch (error) {
        if (isMounted) console.error('Subscription error:', error);
      }
    };

    subscribe();

    // Cleanup function to cancel the subscription when the component unmounts
    return () => {
      isMounted = false;
      if (subscription) {
        subscription.return(); // This properly cancels the async iterator
      }
      console.log('Cleaning up subscription...');
    };
  }, [client]);

  const getDesktopView = () => {
    return (
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <div style={{ border: '1px solid #fafafa', height: '75vh' }}>
            <Senderslist liveMessages={messages} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ border: '1px solid #fafafa', height: '75vh' }}>
            <Conversation liveMessages={messages} />
          </div>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    );
  };

  const getMobileView = () => {
    return (
      <div>
        {username === 'to' ? (
          <Senderslist liveMessages={messages} />
        ) : (
          <Conversation liveMessages={messages} />
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {width > 800 ? getDesktopView() : <></>}
      {width < 800 ? getMobileView() : <></>}
    </div>
  );
};

export default Message;
