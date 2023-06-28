class Game {
    static State = {

        Possession: null,

        Period: null,

        Set: null,

        Chrono: {
            Value: null,
            Display: null,
        },

        Horn: null,

        Chrono_24s: {
            Value: null,
            Display: null,
        },

        Horn24s: null,

        Clock: {
            Value: null,
            Display: null,
        },

        Timer: {
            Value: null,
            Status: null,
            LED: null,
        },

        Guest: {
            Player: {
                Name: new Array(16),
                Number: new Array(16),
            },
            TeamName: null,
            Points: null,
            TotalPoints: null,
            PointsInSet: null,
            SetsWon: null,
            Service: null,
            Fouls: {
                Individual: new Array(16),
                Team: null,
            },
            Timeouts: null,
            CountTimeOuts: null,
            PenaltiesInProgress: null,
            Exclusion: {
                Timer: null,
                ShirtNumber: null,
            }
        },
        Home: {
            Player: {
                Name: new Array(16),
                Number: new Array(16),
            },
            TeamName: null,
            Points: null,
            TotalPoints: null,
            PointsInSet: null,
            SetsWon: null,
            Service: null,
            Fouls: {
                Individual: new Array(16),
                Team: null,
            },

            Timeouts: null,
            CountTimeOuts: null,
            PenaltiesInProgress: null,

            Exclusion: {
                Timer: null,
                ShirtNumber: null,
            },
        }
    }

}