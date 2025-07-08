export interface VetRow {
  phase: string;
  recTime: string;
  heartRate: string;
  mucousMembranes: 'A' | 'B' | 'C' | 'D';
  capillaryRefill: number;
  skinTurgor: number;
  gutSounds: 'A' | 'B' | 'C' | 'D';
  girthBackWithers: 'A' | 'B' | 'C' | 'D';
  muscleTone: 'A' | 'B' | 'C' | 'D';
  gait: 'A' | 'B' | 'C' | 'D';
  vet: string;

  }
 
  
  export const mockVetData: VetRow[] = [
  
        {
          phase:"PRE",
          recTime: "00:00",
    heartRate: "40",
    mucousMembranes: "A",
    capillaryRefill: 1.5,
    skinTurgor: 1,
    gutSounds: "A",
    girthBackWithers: "A",
    muscleTone: "A",
    gait: "A",
    vet: "Ali"

        },

    {
      phase: "1",
      recTime: "01:31",
      heartRate: "61/64",
      mucousMembranes: "B",
      capillaryRefill: 1,
      skinTurgor: 1,
      gutSounds: "A",
      girthBackWithers: "A",
      muscleTone: "A",
      gait: "A",
      vet: "Cem"
    },

{    phase: "2",
    recTime: "01:35",
    heartRate: "61/65",
    mucousMembranes: "A",
    capillaryRefill: 1,
    skinTurgor: 1,
    gutSounds: "A",
    girthBackWithers: "A",
    muscleTone: "A",
    gait: "B",
    vet: "Kelli"},
{    phase: "3",
    recTime: "01:37",
    heartRate: "62/63",
    mucousMembranes: "B",
    capillaryRefill: 1,
    skinTurgor: 1,
    gutSounds: "A",
    girthBackWithers: "A",
    muscleTone: "B",
    gait: "B",
    vet: "Dudu"},
{    phase: "4",
    recTime: "01:37",
    heartRate: "62/63",
    mucousMembranes: "B",
    capillaryRefill: 1,
    skinTurgor: 1,
    gutSounds: "A",
    girthBackWithers: "A",
    muscleTone: "B",
    gait: "B",
    vet: "Dudu"}
    
  ]
 
  
  export type TimingCheckpoint = {
    phase: number;
    recTime: string;
    pos: number;
    start: string;
    arrived: string;
    inspection: string;
    recTime2: string;
    loopSpeed: string;
    loopTime: string;
    phaseSpeed: string;
    phaseTime: string;
    rideLoop: string;
    avgRideTime: string;
    rideSpeed: string;
    rideTime: string;
    toFirst: string;
    color: 'yellow' | 'green' | 'blue' | 'red' | 'purple' | string;
  };
  
  export type TimingData = {
    horseName: string;
    horseId: number;
    riderName: string;
    teamName: string;
    teamRank: number;
    checkpoints: TimingCheckpoint[];
  };


  export const timingData: TimingData = {
    horseName: "Thunderbolt",
    horseId: 1245,
    riderName: "Ayşe Kaya",
    teamName: "Kayseri Riders",
    teamRank: 2,
    checkpoints: [
      {
        phase: 1,
        recTime: "40",
        pos: 1,
        start: "05:30:00",
        arrived: "07:34:59",
        inspection: "07:36:17",
        recTime2: "01:18",
        loopSpeed: "19.203",
        loopTime: "02:04:59",
        phaseSpeed: "19.005",
        phaseTime: "01:55:09",
        rideLoop: "16.386",
        avgRideTime: "05:32",
        rideSpeed: "15.632",
        rideTime: "01:52:56",
        toFirst: "+00:36",
        color: "purple",
      },
      {
        phase: 2,
        recTime: "40",
        pos: 1,
        start: "05:30:00",
        arrived: "07:34:59",
        inspection: "07:36:17",
        recTime2: "01:18",
        loopSpeed: "19.203",
        loopTime: "02:04:59",
        phaseSpeed: "19.005",
        phaseTime: "01:55:09",
        rideLoop: "16.386",
        avgRideTime: "05:32",
        rideSpeed: "15.632",
        rideTime: "01:52:56",
        toFirst: "+00:36",
        color: "yellow",
      },
      {
        phase: 3,
        recTime: "40",
        pos: 1,
        start: "05:30:00",
        arrived: "07:34:59",
        inspection: "07:36:17",
        recTime2: "01:18",
        loopSpeed: "19.203",
        loopTime: "02:04:59",
        phaseSpeed: "19.005",
        phaseTime: "01:55:09",
        rideLoop: "16.386",
        avgRideTime: "05:32",
        rideSpeed: "15.632",
        rideTime: "01:52:56",
        toFirst: "+00:36",
        color: "red",
      },
      {
        phase: 4,
        recTime: "40",
        pos: 1,
        start: "05:30:00",
        arrived: "07:34:59",
        inspection: "07:36:17",
        recTime2: "01:18",
        loopSpeed: "19.203",
        loopTime: "02:04:59",
        phaseSpeed: "19.005",
        phaseTime: "01:55:09",
        rideLoop: "16.386",
        avgRideTime: "05:32",
        rideSpeed: "15.632",
        rideTime: "01:52:56",
        toFirst: "+00:36",
        color: "blue",
      },
    ]
  }