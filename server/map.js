import _ from 'lodash';

export default function map(message = {}) {
  const { user = {}, segments = [], events = [] } = message;

  const mapped = {}; // currently only mapping to identify but leaving some room to add events later

  // Look for an anonymousId
    // if we have events in the payload, we take the annymousId of the first event
    // Otherwise, we look for known anonymousIds attached to the user and we take the last one
  let anonymousId;
  if (events && events.length > 0 && events[0].anonymous_id) {
    anonymousId = events[0].anonymous_id;
  } else if (user.anonymous_ids && user.anonymous_ids.length) {
    anonymousId = _.first(user.anonymous_ids);
  }

  const publicIdField = "id";
  const userId = user[publicIdField];

  // We have no identifier for the user, we have to skip
  if (!userId && !anonymousId) {
    return mapped;
  }

  // Build traits that will be sent to Segment
  // Use hull_segments by default
  const { traits = {} } = user;
  traits.hull_segments = _.map(segments, "name");

  // Assemble everything
  mapped.identify = {
    type: 'identify',
    userId,
    anonymousId,
    traits
  };

  return mapped;
}
