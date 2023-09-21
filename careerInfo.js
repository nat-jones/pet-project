import React from 'react';
import { Icon } from 'native-base';
import { ICON_SIZE } from './layoutConsts';

export const CAREER_INFO = {
  therapy: {
    id: 'therapy',
    displayString: 'Therapy',
    description:
      'Therapy dogs are dogs who go \
to schools, hospitals, and nursing homes. \
therapy dogs and their owners work together as a team to \
improve the lives of people in need. \
The most important characteristic of a therapy dog is its \
temperament. A good therapy dog must be friendly, patient, \
confident, gentle, and at ease in all situations. Therapy \
dogs must enjoy human contact and be content to be \
petted and handled, sometimes clumsily.',
    imageSrc: require('./assets/therapyDog.jpg'),
    barVals: {
      love: 5,
      hunger: 3,
      exercise: 1,
      intelligence: 1,
      cleanliness: 5,
    },
    primaryColor: '#ebadd6',
    secondaryColor: 'white',
    icon: (
      <Icon type="FontAwesome5" name="heart" style={{ fontSize: ICON_SIZE }} />
    ),
  },
  service: {
    id: 'service',
    displayString: 'Service',
    description:
      'A service animal means any dog that is individually \
trained to do work or perform tasks for the benefit of an individual with \
a disability, including a physical, sensory, psychiatric, intellectual, \
or other mental disability. Service dogs should be individually trained \
in essential tasks that a person could not otherwise perform due to \
his/her disability. Additionally, service dogs should be well behaved \
and under control in the community.',
    imageSrc: require('./assets/serviceDog.jpg'),
    barVals: {
      love: 5,
      hunger: 2,
      exercise: 1,
      intelligence: 4,
      cleanliness: 3,
    },
    primaryColor: '#e6ac00',
    secondaryColor: 'white',
    icon: (
      <Icon type="FontAwesome5" name="plus" style={{ fontSize: ICON_SIZE }} />
    ),
  },
  herding: {
    id: 'herding',
    displayString: 'Herding',
    description:
      'A herding dog or pastoral breed is a dog that either \
has been trained in herding or that is a member of a breed developed for \
herding. Commonly herded animals include cattle, sheep, and reindeer, \
although it is not unusual for poultry to be handled by dogs.',
    imageSrc: require('./assets/herdingDog.jpg'),
    barVals: {
      love: 3,
      hunger: 3,
      exercise: 5,
      intelligence: 3,
      cleanliness: 1,
    },
    primaryColor: '#009933',
    secondaryColor: 'white',
    icon: (
      <Icon
        type="MaterialCommunityIcons"
        name="sheep"
        style={{ fontSize: ICON_SIZE }}
      />
    ),
  },
  hollywood: {
    id: 'hollywood',
    displayString: 'Hollywood',
    description: 'hollywood dog description',
    imageSrc: require('./assets/hollywoodDog.jpg'),
    barVals: {
      love: 2,
      hunger: 1,
      exercise: 2,
      intelligence: 5,
      cleanliness: 5,
    },
    primaryColor: '#cc0000',
    secondaryColor: 'white',
    icon: (
      <Icon type="FontAwesome" name="star" style={{ fontSize: ICON_SIZE }} />
    ),
  },
  rescue: {
    id: 'rescue',
    displayString: 'Search and Rescue',
    description:
      'Search and rescue dogs spring into action assisting \
humans during difficult times. They track people lost in the wilderness or those \
lost after a natural disaster. They locate people trapped in debris after an \
earthquake or buried under an avalanche of snow. Search and rescue dogs adapt to a variety of \
circumstances and work well under pressure.',
    imageSrc: require('./assets/searchAndRescueDog.jpg'),
    barVals: {
      love: 3,
      hunger: 3,
      exercise: 4,
      intelligence: 4,
      cleanliness: 1,
    },
    primaryColor: '#b3ecff',
    secondaryColor: 'white',
    icon: (
      <Icon
        type="FontAwesome5"
        name="life-ring"
        style={{ fontSize: ICON_SIZE }}
      />
    ),
  },
  detection: {
    id: 'detection',
    displayString: 'Detection',
    description:
      'A detection dog or sniffer dog is a dog that is trained \
to use its senses to detect substances such as explosives, illegal drugs, \
wildlife scat, currency, blood, and contraband electronics such as illicit \
mobile phones. The smell from the detection dogs are more enhanced than the \
average dog. They are trained to have this great sense of smell.',
    imageSrc: require('./assets/detectionDog.jpg'),
    barVals: {
      love: 2,
      hunger: 3,
      exercise: 3,
      intelligence: 4,
      cleanliness: 3,
    },
    primaryColor: '#bfbfbf',
    secondaryColor: 'white',
    icon: (
      <Icon type="FontAwesome5" name="bomb" style={{ fontSize: ICON_SIZE }} />
    ),
  },
  truffle: {
    id: 'truffle',
    displayString: 'Truffle Sniffing',
    description:
      'Truffles are a variety of edible fungus which can cost as much \
as $800 per pound. Although people historically used pigs to sniff out truffles, \
truffle hogs would eat their findings faster than their owners could harvest them. \
Because of this, dogs are more commonly used now to locate truffles. Truffle dogs \
need to be well-fed to prevent them from eating their findings.',
    imageSrc: require('./assets/truffleDog.jpg'),
    barVals: {
      love: 3,
      hunger: 5,
      exercise: 3,
      intelligence: 3,
      cleanliness: 1,
    },
    primaryColor: '#FFFDD0',
    secondaryColor: 'white',
    icon: (
      <Icon
        type="MaterialCommunityIcons"
        name="mushroom"
        style={{ fontSize: ICON_SIZE }}
      />
    ),
  },
};
