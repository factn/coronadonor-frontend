import React from "react";
import { CustomRepository, getRepository } from 'fireorm';
import { BaseRepository } from './BaseRepository'
import { Mission } from './schema';
import missions from "./Missions";

describe('Missions', () => {
  describe('#removeVolunteerFromMission', () => {

    beforeEach(() => {
    });

    it('unassigns volunteer', () => {
      const missionId = "1234";
      const mission = new Mission();
      mission.missionId = missionId;

      const mockFindById = jest.fn();
      BaseRepository.prototype.findById = mockFindById;
      mockFindById.mockReturnValue(Promise.resolve(mission));

      const mockUpdate = jest.fn();
      BaseRepository.prototype.update = mockUpdate;
      mockUpdate.mockReturnValue(Promise.resolve(mission));

      missions.removeVolunteerFromMission(missionId)
      expect(mockFindById).toHaveBeenCalledTimes(1);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
      expect(mission.volunteer).toBe(null);
    });
  });
});
