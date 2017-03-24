/* global describe, it */
import { expect } from 'chai';

import mapIdentify from "../server/map";

const { events, segments, user, changes } = require("./fixtures");

const message = { changes, events, segments, user };

describe('map to Segment/MadKudu format', function () {
  it("should map a hull message to a Segment identify object", () => {
    const { identify } = mapIdentify(message);
    // console.log('payload', identify);
    expect(identify).to.have.a.property('type', 'identify');
    expect(identify).to.have.a.property('userId');
  });
});
