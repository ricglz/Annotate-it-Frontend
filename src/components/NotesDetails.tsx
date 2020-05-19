import Loader from './Loader';
import React from 'react';
import loadable from "@loadable/component";
import { graphql } from 'react-relay';
import { useParams } from 'react-router-dom';
import { useQuery } from 'relay-hooks';

const NotesContent = loadable(() => import('./NotesContent'), {
  fallback: <Loader />
});

const query = graphql`
  query NotesDetailsQuery($noteId: ID!) {
    viewer {
      note(id: $noteId) {
        id
        content
      }
    }
  }
`

const NotesDetails = () => {
  const { noteId } = useParams();
  const { props, error } = useQuery(query, { noteId });
  if(props) {
    const { viewer = {} } = props;
    const { note = {} } = viewer;
    return (
      <NotesContent note={note} />
    );
  }
  if(error) {
    return <div>{ error.message }</div>;
  }
  return <Loader />;
};

export default NotesDetails;
