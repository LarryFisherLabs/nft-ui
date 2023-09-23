const topLevel = 8
const antennaAndHolsterAndLegGearAndEyePatchLevel = 2
const helmetAndNvgLevel = 7
const headGearLevel = topLevel
const faceAndOpticGearAndToolAndWatchLevel = 6
const faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel = 1
const neckGearLevel = 5
const bandoLevel = 4
const bodyGearLevel = 3
const backgroundLevel = 0

// CUSTOM
// Sam: 4
// Nick: 3
// Noah: 3
// Jen: 3
// Amanda: 3
// Austin: 2
// Cole: 4
// Evrim: 3
// Alex: 3
// Justin: 3
// Ben: 3
// Johnny: 2
// Dante: 3
// Josh: 3
// Abbi: 3
// Mike: 3

// antenna is on top of vehicle
const antenna = [
    {
        name: '0-ant-antenna',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '1-tied-antenna',
        rarity: 1,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '2-broken-antenna',
        rarity: 3,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    }
]

// head gear goes on top of everything besides helmets under nvg
const headGear = [
    {
        name: 'empty',
    },
    {
        name: '1-baseball-cap',
        rarity: 0,
        layerLevel: headGearLevel,
    },
    {
        name: '2-desert-baseball-cap',
        rarity: 0,
        layerLevel: headGearLevel,
    },
    {
        name: '3-helmet',
        rarity: 0,
        layerLevel: helmetAndNvgLevel,
    },
    {
        name: '4-desert-helmet',
        rarity: 0,
        layerLevel: helmetAndNvgLevel,
    },
    {
        name: '5-helmet-with-strap',
        rarity: 0,
        layerLevel: helmetAndNvgLevel,
    },
    {
        name: '6-tanker-cap',
        rarity: 1,
        layerLevel: headGearLevel,
    },
    {
        name: '7-trucker-cap',
        rarity: 1,
        layerLevel: headGearLevel,
        isMidTall: true,
        isComingSoon: true
    },
    {
        name: '8-boonie',
        rarity: 2,
        layerLevel: headGearLevel,
    },
    {
        name: '9-desert-boonie',
        rarity: 2,
        layerLevel: headGearLevel,
    },
    {
        name: '10-beret',
        rarity: 2,
        layerLevel: headGearLevel,
    },
    {
        name: '11-headband',
        rarity: 3,
        layerLevel: headGearLevel,
    },
    {
        name: '12-dress-cap',
        rarity: 3,
        layerLevel: headGearLevel,
    },
    {
        name: '13-desert-dress-cap',
        rarity: 3,
        layerLevel: headGearLevel,
    },
    {
        name: '14-helmet-with-webbing',
        rarity: 4,
        layerLevel: helmetAndNvgLevel,
    },
    {
        name: '15-eod-mask',
        rarity: 4,
        layerLevel: headGearLevel,
    },
    {
        name: '16-m81-helmet-with-strap',
        rarity: 4,
        layerLevel: helmetAndNvgLevel,
        isComingSoon: true
    },
    {
        name: '17-uni-hat',
        rarity: 5,
        layerLevel: headGearLevel,
        isTall: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Sam
        name: '18-chef-hat',
        rarity: 6,
        layerLevel: headGearLevel,
        isTall: true,
        isComingSoon: true
    },
    {
        name: '19-uncle-sam-hat',
        rarity: 6,
        layerLevel: headGearLevel,
        isTall: true,
        isComingSoon: true
    },
    {
        name: '20-tiger-cap',
        rarity: 6,
        layerLevel: headGearLevel,
        isComingSoon: true
    },
    {
        name: '21-desperado-hat',
        rarity: 6,
        layerLevel: headGearLevel,
        isComingSoon: true
    },
    {
        name: '22-purple-helmet',
        rarity: 7,
        layerLevel: helmetAndNvgLevel,
        isComingSoon: true
    },
    {
        name: '23-shrouded-helmet',
        rarity: 8,
        layerLevel: headGearLevel,
        isMidTall: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Ben
        name: '24-black-trucker-cap',
        rarity: 4,
        layerLevel: headGearLevel,
        isMidTall: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Cole
        name: '24-painted-helmet',
        rarity: 4,
        layerLevel: helmetAndNvgLevel,
        isComingSoon: true
    },
    {
        name: '24-black-helmet-with-strap',
        rarity: 4,
        layerLevel: helmetAndNvgLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Jen
        name: '24-cat-helmet',
        rarity: 4,
        layerLevel: helmetAndNvgLevel,
        isMidTall: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Amanda
        name: '24-heart-helmet',
        rarity: 4,
        layerLevel: helmetAndNvgLevel,
        isComingSoon: true
    },
    {
        name: '24-cavalry-cover',
        rarity: 4,
        layerLevel: headGearLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Evrim
        name: '24-flamed-racing-helmet',
        rarity: 4,
        layerLevel: headGearLevel,
        isMidTall: true,
        isEODHeadRestrictions: true,
        isComingSoon: true
    },
    {
        name: '24-racing-helmet',
        rarity: 4,
        layerLevel: headGearLevel,
        isMidTall: true,
        isEODHeadRestrictions: true,
        isComingSoon: true
    },
    {
        name: '24-helmet-with-headset',
        rarity: 4,
        layerLevel: helmetAndNvgLevel,
        isComingSoon: true
    },
    {
        name: '24-combat-headset',
        rarity: 4,
        layerLevel: headGearLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Johnny
        name: '24-NY-helmet',
        rarity: 4,
        layerLevel: helmetAndNvgLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Josh
        name: '24-m81-helmet-with-peace-sign',
        rarity: 4,
        layerLevel: helmetAndNvgLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Nick
        name: '24-welding-helmet',
        rarity: 4,
        layerLevel: headGearLevel,
        isEODHeadRestrictions: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Dante
        name: '24-orange-headband',
        rarity: 4,
        layerLevel: headGearLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Abbi
        name: '24-monarch-helmet',
        rarity: 4,
        layerLevel: helmetAndNvgLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Mike
        name: '24-fishing-boonie',
        rarity: 4,
        layerLevel: headGearLevel,
        isComingSoon: true
    },
]

// goes beneath head gear
const faceGear = [
    {
        name: 'empty',
    },
    {
        name: '1-surgeon-mask',
        rarity: 1,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '2-respirator',
        rarity: 1,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '3-balaclava',
        rarity: 2,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '4-tech-mask',
        rarity: 2,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '5-desert-tech-mask',
        rarity: 2,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '6-full-black-mask',
        rarity: 3,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '7-bandito-balaclava',
        rarity: 3,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '8-cold-weather-mask',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isFaceCovered: true,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '9-gas-mask',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isFaceCovered: true,
        isMouthCovered: true,
    },
    {
        name: '10-skull-mask',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '11-gas-mask-bong',
        rarity: 8,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isFaceCovered: true,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Cole
        name: '12-painted-gas-mask',
        rarity: 8,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isFaceCovered: true,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Justin
        name: '13-road-fury-muzzle',
        rarity: 3,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isMouthCovered: true,
        isComingSoon: true
    },
]

// goes under head gear except for eyepatch which only goes on top of face accessories
const opticalGear = [
    {
        name: 'empty',
    },
    {
        // eye patch should go over face accessories and nothing else
        name: '1-eyepatch',
        rarity: 1,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '2-goggles',
        rarity: 2,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '3-nerd-glasses',
        rarity: 2,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '4-sunglasses',
        rarity: 3,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '5-nvg',
        rarity: 3,
        layerLevel: helmetAndNvgLevel,
    },
    {
        name: '6-trooper-shades',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '7-uni-shades',
        rarity: 5,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '8-general-sunglasses',
        rarity: 6,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '9-uncle-sam-glasses',
        rarity: 7,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '10-vaquero-sunglasses',
        rarity: 7,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '11-cool-sunglasses',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '11-drone-op-headset',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '11-black-goggles',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    }
]

// nothing goes beneath face accessories so bottom non-background layer
const faceAccessories = [
    {
        name: 'empty',
    },
    {
        name: '1-black-eye',
        rarity: 0,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '2-eye-black',
        rarity: 1,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '3-face-shadow',
        rarity: 1,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '4-eye-scar',
        rarity: 2,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '5-smooches',
        rarity: 2,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '6-claw-mark',
        rarity: 2,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '7-skull',
        rarity: 3,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '8-kiss',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '9-clown',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '10-muertos',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Alex
        name: '11-tear',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    }
]

// nothing goes beneath mouth accessories so bottom non-background layer
const mouthAccessories = [
    {
        name: 'empty',
    },
    {
        name: '1-cigarette',
        rarity: 2,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '2-cigarillo',
        rarity: 3,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '3-cigar',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '4-cuban-cigar',
        rarity: 5,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    }
]

// should go under face gear and on top of body gear and belts
const neckGear = [
    {
        name: '0-dog-tags',
        rarity: 0,
        layerLevel: neckGearLevel,
    },
    {
        name: '1-tags-with-bumper',
        rarity: 0,
        layerLevel: neckGearLevel,
        isComingSoon: true
    },
    {
        name: '2-shemagh',
        rarity: 0,
        layerLevel: neckGearLevel,
    },
    {
        name: '3-green-shemagh',
        rarity: 1,
        layerLevel: neckGearLevel,
        isComingSoon: true
    },
    {
        name: '4-white-shemagh',
        rarity: 2,
        layerLevel: neckGearLevel,
        isComingSoon: true
    },
    {
        name: '5-yellow-shemagh',
        rarity: 2,
        layerLevel: neckGearLevel,
        isComingSoon: true
    },
    {
        name: '6-royal-shemagh',
        rarity: 3,
        layerLevel: neckGearLevel,
        isComingSoon: true
    },
    {
        name: '7-ancient-dog-tags',
        rarity: 4,
        layerLevel: neckGearLevel,
        isComingSoon: true
    },
    {
        name: '8-gold-dog-tags',
        rarity: 6,
        layerLevel: neckGearLevel,
        isComingSoon: true
    }
]

// goes on top of body gear but under neck
const bandolierBelts = [
    {
        name: 'empty',
    },
    {
        name: '1-reflective-belt',
        rarity: 0,
        layerLevel: bandoLevel,
    },
    {
        name: '2-bandolier',
        rarity: 1,
        layerLevel: bandoLevel,
    },
    {
        name: '3-shotgun-bandolier',
        rarity: 2,
        layerLevel: bandoLevel,
    }
]

// goes under belt but on top of arm
const bodyGear = [
    {
        name: '0-tee-shirt',
        rarity: 0,
        layerLevel: bodyGearLevel,
    },
    {
        name: '1-desert-tee-shirt',
        rarity: 0,
        layerLevel: bodyGearLevel,
    },
    {
        name: '2-tank-top',
        rarity: 1,
        layerLevel: bodyGearLevel,
    },
    {
        name: '3-desert-tank-top',
        rarity: 1,
        layerLevel: bodyGearLevel,
    },
    {
        name: '4-beater',
        rarity: 1,
        layerLevel: bodyGearLevel,
    },
    {
        name: '5-dress-uniform',
        rarity: 2,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
    },
    {
        name: '6-desert-dress-uniform',
        rarity: 2,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
    },
    {
        name: '7-plate-carrier',
        rarity: 3,
        layerLevel: bodyGearLevel,
    },
    {
        name: '8-desert-plate-carrier',
        rarity: 3,
        layerLevel: bodyGearLevel,
    },
    {
        name: '9-flak-vest',
        rarity: 3,
        layerLevel: bodyGearLevel,
    },
    {
        name: '10-desert-flak-vest',
        rarity: 3,
        layerLevel: bodyGearLevel,
    },
    {
        name: '11-bomber-jacket',
        rarity: 4,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '12-leather-bomber-jacket',
        rarity: 4,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '13-eod-suit',
        rarity: 4,
        layerLevel: bodyGearLevel,
    },
    {
        name: '14-ghillie',
        rarity: 4,
        layerLevel: bodyGearLevel,
    },
    {
        name: '15-m81-flak-vest',
        rarity: 4,
        layerLevel: bodyGearLevel,
        isComingSoon: true
    },
    {
        name: '16-uncle-sam-shirt',
        rarity: 5,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '17-tiger-plate-carrier',
        rarity: 5,
        layerLevel: bodyGearLevel,
        isComingSoon: true
    },
    {
        name: '18-sand-tiger-plate-carrier',
        rarity: 5,
        layerLevel: bodyGearLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Sam
        name: '19-chef-uniform',
        rarity: 5,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '20-uni-plate-carrier',
        rarity: 6,
        layerLevel: bodyGearLevel,
        isComingSoon: true
    },
    {
        name: '21-hoodie-plate-carrier',
        rarity: 7,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '22-purp-flak-vest',
        rarity: 7,
        layerLevel: bodyGearLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Noah
        name: '23-leather-jacket',
        rarity: 4,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Jen
        name: '23-road-warrior-jacket',
        rarity: 4,
        layerLevel: bodyGearLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Cole
        name: '23-suit',
        rarity: 4,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Abbi
        name: '23-tracksuit-plate-carrier',
        rarity: 4,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '23-black-plate-carrier',
        rarity: 4,
        layerLevel: bodyGearLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Austin
        name: '23-hoodie-peace-sign-plate-carrier',
        rarity: 4,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '23-command-uniform',
        rarity: 4,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '23-tanker-jacket',
        rarity: 4,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Justin
        name: '23-hacker-plate-carrier',
        rarity: 4,
        layerLevel: bodyGearLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Johnny, Josh
        name: '23-northeast-plate-carrier',
        rarity: 4,
        layerLevel: bodyGearLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Dante
        name: '23-short-sleeve-hoodie',
        rarity: 4,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        // CUSTOM: Ben
        name: '23-tee-shirt-with-cigs',
        rarity: 4,
        layerLevel: bodyGearLevel,
        isComingSoon: true
    },
    {
        name: '23-pilot-jumpsuit-top',
        rarity: 4,
        layerLevel: bodyGearLevel,
        hasSleeves: true,
        isComingSoon: true
    }
]

// nothing goes beneath foreLeg so bottom non-background layer
const leftForeleg = [
    {
        name: '0-ant-left-foreleg',
        rarity: 0,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '1-black-prosthetic-foreleg',
        rarity: 3,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '2-camo-prosthetic-foreleg',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '3-silver-prosthetic-foreleg',
        rarity: 5,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    }
]

// lower than watch
const gunsEquipment = [
    {
        name: '0-knife',
        rarity: 0,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '1-uzi',
        rarity: 0,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '2-smg-sd',
        rarity: 1,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '3-assault-rifle',
        rarity: 1,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '4-shotgun',
        rarity: 2,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '5-lmg',
        rarity: 2,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '6-bazooka',
        rarity: 3,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '7-sniper-rifle',
        rarity: 3,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '8-medal',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '9-map',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '10-anti-materiel-rifle',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '11-flamethrower',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
    },
    {
        name: '12-fireworks-gun',
        rarity: 5,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Sam
        name: '13-akimbo-chef-knives',
        rarity: 6,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '14-uni-shotgun',
        rarity: 6,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '15-tommygun-smg',
        rarity: 6,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '16-oldie-assault-rifle',
        rarity: 6,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '17-intervention',
        rarity: 7,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '18-blazed-flamethrower',
        rarity: 8,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Evrim
        name: '19-flamed-fireworks-gun',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '19-gold-rifle',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '19-shovel',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '19-e-tool',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Alex
        name: '19-onion-mgl',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '19-mgl',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Justin
        name: '19-DDOS',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '19-walkie-talkie',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '19-field-reciever',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Nick
        name: '19-welding-torch',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Noah
        name: '19-future-rifle',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Abbi
        name: '19-hippy-battle-rifle',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '19-battle-rifle',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Mike
        name: '19-bowie-knife',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    }
]

// top level
const watch = [
    {
        name: 'empty',
    },
    {
        name: '1-green-watch',
        rarity: 0,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '2-black-watch',
        rarity: 1,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '3-full-black-watch',
        rarity: 2,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '4-silver-watch',
        rarity: 2,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '5-silver-uni-watch',
        rarity: 3,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '6-gold-watch',
        rarity: 4,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    },
    {
        name: '7-gold-uni-watch',
        rarity: 5,
        layerLevel: faceAndOpticGearAndToolAndWatchLevel,
        isComingSoon: true
    }
]

// on top of tattoo
const holster = [
    {
        name: '0-holster',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '1-green-holster',
        rarity: 1,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
        isComingSoon: true
    },
    {
        name: '2-brown-holster',
        rarity: 1,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
        isComingSoon: true
    },
    {
        name: '3-uni-holster',
        rarity: 2,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
        isComingSoon: true
    },
    {
        name: '4-tan-holster',
        rarity: 4,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
        isComingSoon: true
    },
    {
        name: '5-leather-holster',
        rarity: 5,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
        isComingSoon: true
    },
    {
        name: '6-purp-holster',
        rarity: 5,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
        isComingSoon: true
    },
    {
        name: '7-santa-maria-holster',
        rarity: 5,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
        isComingSoon: true
    },
    {
        name: '8-americana-holster',
        rarity: 5,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
        isComingSoon: true
    }
]

// bottom non-background layer
const abdomenAccessories = [
    {
        name: 'empty',
    },
    {
        name: '1-peace-sign',
        rarity: 0,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '2-bomb',
        rarity: 0,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '3-stars',
        rarity: 1,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '4-skull',
        rarity: 1,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '5-crosshair',
        rarity: 2,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '6-wound',
        rarity: 2,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '7-mom-tattoo',
        rarity: 3,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '8-btk',
        rarity: 3,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '9-tank-kills',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '10-fire',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '11-star',
        rarity: 5,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Sam
        name: '12-dinnertime',
        rarity: 6,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '13-uni-tat',
        rarity: 6,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '14-flag-patch',
        rarity: 6,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '15-blued',
        rarity: 7,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '16-most-dope',
        rarity: 7,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '17-headshot-crosshair',
        rarity: 8,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Amanda
        name: '18-butterfly',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Austin
        name: '18-live-free',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Alex
        name: '18-oh-brother',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Nick
        name: '18-hockey-sticks',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Dante
        name: '18-bball',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Mike
        name: '18-big-weenie',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
]

// on top of legs
const legGear = [
    {
        name: 'empty',
    },
    {
        name: '0-desert-tac-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-command-uniform-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-black-tac-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-campaign-shorts',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-desert-uniform-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-dress-uniform-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        // CUSTOM: Noah
        name: '0-leather-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-m81-tac-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        // CUSTOM: Amanda
        name: '0-pink-punk-tac-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-pt-shorts',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        // CUSTOM: Cole
        name: '0-suit-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        // CUSTOM: Jen
        name: '0-tac-pants-brown-boots',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-tac-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-tanker-trousers',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-air-cav-jumpsuit-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
    {
        name: '0-pilot-jumpsuit-pants',
        rarity: 0,
        layerLevel: antennaAndHolsterAndLegGearAndEyePatchLevel,
    },
]

// lowest non-background level
const hindLegs = [
    {
        name: '0-ant-hind-legs',
        rarity: 0,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '1-black-hind-prosthetic',
        rarity: 3,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
    },
    {
        name: '2-silver-hind-prosthetic',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Ben
        name: '3-cyber-legs',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '3-silver-prosthetic-hind-legs',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '3-black-prosthetic-hind-legs',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    }
]

// lowest non-background level
const vehicles = [
    {
        name: 'empty',
    },
    {
        name: '1-dpv',
        rarity: 1,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //250k
    },
    {
        name: '2-humvee',
        rarity: 1,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //300k
    },
    {
        name: '3-little-bird',
        rarity: 1,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //2mil
    },
    {
        name: '4-mrap',
        rarity: 2,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //800k
    },
    {
        name: '5-warthog',
        rarity: 2,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //20mil
    },
    {
        name: '6-chinook',
        rarity: 2,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //42mil
    },
    {
        name: '7-lav',
        rarity: 3,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //4mil
    },
    {
        name: '8-blackhawk',
        rarity: 3,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //45mil
    },
    {
        name: '9-osprey',
        rarity: 3,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //84mil
    },
    {
        name: '10-apache',
        rarity: 3,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //90mil
    },
    {
        name: '11-bradley',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //4.5mil
    },
    {
        name: '12-raptor',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //143mil
    },
    {
        name: '13-globemaster',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //340mil
    },
    {
        name: '14-abrams',
        rarity: 5,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //11mil
    },
    {
        name: '15-stealth-bomber',
        rarity: 5,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        //730mil
    },
    {
        name: '16-technical',
        rarity: 6,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '17-unicorn',
        rarity: 6,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '18-bulldozer',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '18-mine-layer',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '18-drone',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '18-artillery',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        name: '18-water-buffalo',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    },
    {
        // CUSTOM: Evrim
        name: '18-turbo-dpv',
        rarity: 4,
        layerLevel: faceAndMouthAccAndVehicleAndArmAndTatAndLegsLevel,
        isComingSoon: true
    }
]

// lowest level
const backgrounds = [
    {
        name: '0-common',
        rarity: 0,
        layerLevel: backgroundLevel,
    },
    {
        name: '1-yellow',
        rarity: 3,
        layerLevel: backgroundLevel,
    },
    {
        name: '2-pink',
        rarity: 4,
        layerLevel: backgroundLevel,
    },
    {
        name: '3-light-blue',
        rarity: 6,
        layerLevel: backgroundLevel,
        isComingSoon: true
    }
]

export const staticLayerInfo = [
    {
        fileName: '01-antenna',
        elements: antenna
    },
    {
        fileName: '02-head-gear',
        elements: headGear
    },
    {
        fileName: '03-face-gear',
        elements: faceGear
    },
    {
        fileName: '04-optical-gear',
        elements: opticalGear
    },
    {
        fileName: '05-face-accessories',
        elements: faceAccessories
    },
    {
        fileName: '06-mouth-accessories',
        elements: mouthAccessories
    },
    {
        fileName: '07-neck-gear',
        elements: neckGear
    },
    {
        fileName: '08-bandolier-belts',
        elements: bandolierBelts
    },
    {
        fileName: '09-body-gear',
        elements: bodyGear
    },
    {
        fileName: '10-left-foreleg',
        elements: leftForeleg
    },
    {
        fileName: '11-guns-equipment',
        elements: gunsEquipment
    },
    {
        fileName: '12-watch',
        elements: watch
    },
    {
        fileName: '13-holster',
        elements: holster
    },
    {
        fileName: '14-abdomen-accessories',
        elements: abdomenAccessories
    },
    {
        fileName: '15-leg-gear',
        elements: legGear
    },
    {
        fileName: '16-hind-legs',
        elements: hindLegs
    },
    {
        fileName: '17-vehicles',
        elements: vehicles
    },
    {
        fileName: '18-backgrounds',
        elements: backgrounds
    }
]