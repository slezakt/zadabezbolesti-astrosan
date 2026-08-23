import { defineQuery } from 'groq';

export const deployToolStateQuery = defineQuery(`{
  "lastRequest": *[_id == "deploymentRequest" && _type == "deploymentRequest"][0] {
    requestId, requestedAt, requestedById, requestedByName, note
  },
  "draftCount": count(*[_id in path("drafts.**") && _type in $trackedTypes])
}`);
