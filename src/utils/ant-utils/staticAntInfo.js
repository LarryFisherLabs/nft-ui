// vehicles go beneath antenna
const antenna = [
    {
        name: '0-ant-antenna',
        rarity: 0,
        layerLevel: 2,
    },
    {
        name: '1-tied-antenna',
        rarity: 1,
        layerLevel: 2,
    },
    {
        name: '2-broken-antenna',
        rarity: 3,
        layerLevel: 2,
    }
]

// optical gear sometimes goes over head gear so one of top two levels
const headGear = [
    {
        name: 'empty',
    },
    {
        name: '1-baseball-cap',
        rarity: 0,
        layerLevel: 7,
    },
    {
        name: '2-desert-baseball-cap',
        rarity: 0,
        layerLevel: 7,
    },
    {
        name: '3-helmet',
        rarity: 0,
        layerLevel: 6,
    },
    {
        name: '4-desert-helmet',
        rarity: 0,
        layerLevel: 6,
    },
    {
        name: '5-helmet-with-strap',
        rarity: 0,
        layerLevel: 6,
    },
    {
        name: '6-tanker-cap',
        rarity: 1,
        layerLevel: 6,
    },
    {
        name: '7-boonie',
        rarity: 2,
        layerLevel: 7,
    },
    {
        name: '8-desert-boonie',
        rarity: 2,
        layerLevel: 7,
    },
    {
        name: '9-beret',
        rarity: 2,
        layerLevel: 6,
    },
    {
        name: '10-headband',
        rarity: 3,
        layerLevel: 6,
    },
    {
        name: '11-dress-cap',
        rarity: 3,
        layerLevel: 7,
    },
    {
        name: '12-desert-dress-cap',
        rarity: 3,
        layerLevel: 7,
    },
    {
        name: '13-eod-mask',
        rarity: 4,
        layerLevel: 6,
    },
    {
        name: '14-helmet-with-webbing',
        rarity: 4,
        layerLevel: 6,
    },
    {
        name: '15-uni-hat',
        rarity: 5,
        layerLevel: 7,
        isTall: true,
        isComingSoon: true
    },
    {
        name: '16-uncle-sam-hat',
        rarity: 6,
        layerLevel: 7,
        isTall: true,
        isComingSoon: true
    },
    {
        name: '17-tiger-cap',
        rarity: 6,
        layerLevel: 7,
        isComingSoon: true
    },
    {
        name: '18-desperado-hat',
        rarity: 6,
        layerLevel: 7,
        isComingSoon: true
    },
    {
        name: '19-purple-helmet',
        rarity: 7,
        layerLevel: 6,
        isComingSoon: true
    },
    {
        name: '20-shrouded-helmet',
        rarity: 8,
        layerLevel: 6,
        isMidTall: true,
        isComingSoon: true
    },
    {
        name: '21-chef-hat',
        rarity: 8,
        layerLevel: 6,
        isTall: true,
        isComingSoon: true
    },
    {
        name: '22-m81-helmet-with-strap',
        rarity: 8,
        layerLevel: 6,
        isComingSoon: true
    },
    {
        name: '23-trucker-cap',
        rarity: 8,
        layerLevel: 6,
        isMidTall: true,
        isComingSoon: true
    }
]

// should always be beneath head gear so below top two layers
const faceGear = [
    {
        name: 'empty',
    },
    {
        name: '1-surgeon-mask',
        rarity: 1,
        layerLevel: 5,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '2-respirator',
        rarity: 1,
        layerLevel: 5,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '3-balaclava',
        rarity: 2,
        layerLevel: 5,
    },
    {
        name: '4-tech-mask',
        rarity: 2,
        layerLevel: 5,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '5-desert-tech-mask',
        rarity: 2,
        layerLevel: 5,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '6-full-black-mask',
        rarity: 3,
        layerLevel: 5,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '7-bandito-balaclava',
        rarity: 3,
        layerLevel: 5,
        isComingSoon: true
    },
    {
        name: '8-cold-weather-mask',
        rarity: 4,
        layerLevel: 5,
        isFaceCovered: true,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '9-gas-mask',
        rarity: 4,
        layerLevel: 5,
        isFaceCovered: true,
        isMouthCovered: true,
    },
    {
        name: '10-skull-mask',
        rarity: 4,
        layerLevel: 5,
        isMouthCovered: true,
        isComingSoon: true
    },
    {
        name: '11-gas-mask-bong',
        rarity: 8,
        layerLevel: 5,
        isFaceCovered: true,
        isMouthCovered: true,
        isComingSoon: true
    }
]

// should generally be second to highest level to be between head gear levels
const opticalGear = [
    {
        name: 'empty',
    },
    {
        // eye patch should go over face accessories and nothing else
        name: '1-eyepatch',
        rarity: 1,
        layerLevel: 2,
    },
    {
        name: '2-goggles',
        rarity: 2,
        layerLevel: 6,
        isOverEar: true,
    },
    {
        name: '3-nerd-glasses',
        rarity: 2,
        layerLevel: 6,
        isOverEar: true,
        isComingSoon: true
    },
    {
        name: '4-sunglasses',
        rarity: 3,
        layerLevel: 6,
        isOverEar: true,
    },
    {
        // nvg goes over everything
        name: '5-nvg',
        rarity: 3,
        layerLevel: 7,
    },
    {
        name: '6-trooper-shades',
        rarity: 4,
        layerLevel: 6,
        isOverEar: true,
        isComingSoon: true
    },
    {
        name: '7-uni-shades',
        rarity: 5,
        layerLevel: 6,
        isOverEar: true,
        isComingSoon: true
    },
    {
        name: '8-general-sunglasses',
        rarity: 6,
        layerLevel: 6,
        isOverEar: true,
        isComingSoon: true
    },
    {
        name: '9-uncle-sam-glasses',
        rarity: 7,
        layerLevel: 6,
        isOverEar: true,
        isComingSoon: true
    },
    {
        name: '10-vaquero-sunglasses',
        rarity: 7,
        layerLevel: 6,
        isOverEar: true,
        isComingSoon: true
    }
]

// nothing goes beneath face accessories so bottom non-background layer
const faceAccessories = [
    {
        name: 'empty',
    },
    {
        name: '5-black-eye',
        rarity: 0,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '10-eye-black',
        rarity: 1,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '11-face-shadow',
        rarity: 1,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '9-eye-scar',
        rarity: 2,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '4-smooches',
        rarity: 2,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '12-claw-mark',
        rarity: 2,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '7-skull',
        rarity: 3,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '3-kiss',
        rarity: 4,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '8-clown',
        rarity: 4,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '6-muertos',
        rarity: 4,
        layerLevel: 1,
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
        layerLevel: 1,
    },
    {
        name: '2-cigarillo',
        rarity: 3,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '3-cigar',
        rarity: 4,
        layerLevel: 1,
    },
    {
        name: '4-cuban-cigar',
        rarity: 5,
        layerLevel: 1,
        isComingSoon: true
    }
]

// should go on top of body gear, belts and under face gear
const neckGear = [
    {
        name: '0-dog-tags',
        rarity: 0,
        layerLevel: 4,
    },
    {
        name: '1-tags-with-bumper',
        rarity: 0,
        layerLevel: 4,
        isComingSoon: true
    },
    {
        name: '2-shemagh',
        rarity: 0,
        layerLevel: 4,
    },
    {
        name: '3-green-shemagh',
        rarity: 1,
        layerLevel: 4,
        isComingSoon: true
    },
    {
        name: '4-white-shemagh',
        rarity: 2,
        layerLevel: 4,
        isComingSoon: true
    },
    {
        name: '5-yellow-shemagh',
        rarity: 2,
        layerLevel: 4,
        isComingSoon: true
    },
    {
        name: '6-royal-shemagh',
        rarity: 3,
        layerLevel: 4,
        isComingSoon: true
    },
    {
        name: '7-ancient-dog-tags',
        rarity: 4,
        layerLevel: 4,
        isComingSoon: true
    },
    {
        name: '8-gold-dog-tags',
        rarity: 6,
        layerLevel: 4,
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
        layerLevel: 3,
    },
    {
        name: '2-bandolier',
        rarity: 1,
        layerLevel: 3,
    },
    {
        name: '3-shotgun-bandolier',
        rarity: 2,
        layerLevel: 3,
    }
]

// goes under belt but on top of arm
const bodyGear = [
    {
        name: '0-tee-shirt',
        rarity: 0,
        layerLevel: 2,
    },
    {
        name: '1-desert-tee-shirt',
        rarity: 0,
        layerLevel: 2,
    },
    {
        name: '2-tank-top',
        rarity: 1,
        layerLevel: 2,
    },
    {
        name: '3-desert-tank-top',
        rarity: 1,
        layerLevel: 2,
    },
    {
        name: '4-beater',
        rarity: 1,
        layerLevel: 2,
    },
    {
        name: '5-dress-uniform',
        rarity: 2,
        layerLevel: 2,
        hasSleeves: true,
    },
    {
        name: '6-desert-dress-uniform',
        rarity: 2,
        layerLevel: 2,
        hasSleeves: true,
    },
    {
        name: '7-plate-carrier',
        rarity: 3,
        layerLevel: 2,
    },
    {
        name: '8-desert-plate-carrier',
        rarity: 3,
        layerLevel: 2,
    },
    {
        name: '9-flak-vest',
        rarity: 3,
        layerLevel: 2,
    },
    {
        name: '10-desert-flak-vest',
        rarity: 3,
        layerLevel: 2,
    },
    {
        name: '11-bomber-jacket',
        rarity: 4,
        layerLevel: 2,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '12-leather-bomber-jacket',
        rarity: 4,
        layerLevel: 2,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '13-eod-suit',
        rarity: 4,
        layerLevel: 2,
    },
    {
        name: '14-ghillie',
        rarity: 4,
        layerLevel: 2,
    },
    {
        name: '15-m81-flak-vest',
        rarity: 4,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '16-uncle-sam-shirt',
        rarity: 5,
        layerLevel: 2,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '17-tiger-plate-carrier',
        rarity: 5,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '18-sand-tiger-plate-carrier',
        rarity: 5,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '19-chef-uniform',
        rarity: 5,
        layerLevel: 2,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '20-uni-plate-carrier',
        rarity: 6,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '21-hoodie-plate-carrier',
        rarity: 7,
        layerLevel: 2,
        hasSleeves: true,
        isComingSoon: true
    },
    {
        name: '22-purp-flak-vest',
        rarity: 7,
        layerLevel: 2,
        isComingSoon: true
    }
]

// nothing goes beneath foreLeg so bottom non-background layer
const leftForeleg = [
    {
        name: '0-ant-left-foreleg',
        rarity: 0,
        layerLevel: 1,
    },
    {
        name: '1-black-prosthetic-foreleg',
        rarity: 3,
        layerLevel: 1,
    },
    {
        name: '2-camo-prosthetic-foreleg',
        rarity: 4,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '3-silver-prosthetic-foreleg',
        rarity: 5,
        layerLevel: 1,
        isComingSoon: true
    }
]

// lower than watch
const gunsEquipment = [
    {
        name: '0-knife',
        rarity: 0,
        layerLevel: 6,
    },
    {
        name: '1-uzi',
        rarity: 0,
        layerLevel: 6,
    },
    {
        name: '2-smg-sd',
        rarity: 1,
        layerLevel: 6,
    },
    {
        name: '3-assault-rifle',
        rarity: 1,
        layerLevel: 6,
    },
    {
        name: '4-shotgun',
        rarity: 2,
        layerLevel: 6,
    },
    {
        name: '5-lmg',
        rarity: 2,
        layerLevel: 6,
    },
    {
        name: '6-bazooka',
        rarity: 3,
        layerLevel: 6,
    },
    {
        name: '7-sniper-rifle',
        rarity: 3,
        layerLevel: 6,
    },
    {
        name: '8-medal',
        rarity: 4,
        layerLevel: 6,
    },
    {
        name: '9-map',
        rarity: 4,
        layerLevel: 6,
    },
    {
        name: '10-anti-materiel-rifle',
        rarity: 4,
        layerLevel: 6,
    },
    {
        name: '11-flamethrower',
        rarity: 4,
        layerLevel: 6,
    },
    {
        name: '12-fireworks-gun',
        rarity: 5,
        layerLevel: 6,
        isComingSoon: true
    },
    {
        name: '13-uni-shotgun',
        rarity: 6,
        layerLevel: 6,
        isComingSoon: true
    },
    {
        name: '14-tommygun-smg',
        rarity: 6,
        layerLevel: 6,
        isComingSoon: true
    },
    {
        name: '15-oldie-assault-rifle',
        rarity: 6,
        layerLevel: 6,
        isComingSoon: true
    },
    {
        name: '16-intervention',
        rarity: 7,
        layerLevel: 6,
        isComingSoon: true
    },
    {
        name: '17-blazed-flamethrower',
        rarity: 8,
        layerLevel: 6,
        isComingSoon: true
    },
    {
        name: '18-akimbo-chef-knives',
        rarity: 8,
        layerLevel: 6,
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
        layerLevel: 7,
        isComingSoon: true
    },
    {
        name: '2-black-watch',
        rarity: 1,
        layerLevel: 7,
        isComingSoon: true
    },
    {
        name: '3-full-black-watch',
        rarity: 2,
        layerLevel: 7,
        isComingSoon: true
    },
    {
        name: '4-silver-watch',
        rarity: 2,
        layerLevel: 7,
        isComingSoon: true
    },
    {
        name: '5-silver-uni-watch',
        rarity: 3,
        layerLevel: 7,
        isComingSoon: true
    },
    {
        name: '6-gold-watch',
        rarity: 4,
        layerLevel: 7,
        isComingSoon: true
    },
    {
        name: '7-gold-uni-watch',
        rarity: 5,
        layerLevel: 7,
        isComingSoon: true
    }
]

// on top of tattoo
const holster = [
    {
        name: '0-holster',
        rarity: 0,
        layerLevel: 2,
    },
    {
        name: '1-green-holster',
        rarity: 1,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '2-brown-holster',
        rarity: 1,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '3-uni-holster',
        rarity: 2,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '4-tan-holster',
        rarity: 4,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '5-leather-holster',
        rarity: 5,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '6-purp-holster',
        rarity: 5,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '7-santa-maria-holster',
        rarity: 5,
        layerLevel: 2,
        isComingSoon: true
    },
    {
        name: '8-americana-holster',
        rarity: 5,
        layerLevel: 2,
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
        layerLevel: 1,
    },
    {
        name: '2-bomb',
        rarity: 0,
        layerLevel: 1,
    },
    {
        name: '3-stars',
        rarity: 1,
        layerLevel: 1,
    },
    {
        name: '4-skull',
        rarity: 1,
        layerLevel: 1,
    },
    {
        name: '5-crosshair',
        rarity: 2,
        layerLevel: 1,
    },
    {
        name: '6-wound',
        rarity: 2,
        layerLevel: 1,
    },
    {
        name: '7-mom-tattoo',
        rarity: 3,
        layerLevel: 1,
    },
    {
        name: '8-btk',
        rarity: 3,
        layerLevel: 1,
    },
    {
        name: '9-tank-kills',
        rarity: 4,
        layerLevel: 1,
    },
    {
        name: '10-fire',
        rarity: 4,
        layerLevel: 1,
    },
    {
        name: '11-star',
        rarity: 5,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '12-uni-tat',
        rarity: 6,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '13-flag-patch',
        rarity: 6,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '14-blued',
        rarity: 7,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '15-most-dope',
        rarity: 7,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '16-headshot-crosshair',
        rarity: 8,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '17-dinnertime',
        rarity: 8,
        layerLevel: 1,
        isComingSoon: true
    }
]

// lowest non-background level
const hindLegs = [
    {
        name: '0-ant-hind-legs',
        rarity: 0,
        layerLevel: 1,
    },
    {
        name: '1-black-hind-prosthetic',
        rarity: 3,
        layerLevel: 1,
    },
    {
        name: '2-silver-hind-prosthetic',
        rarity: 4,
        layerLevel: 1,
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
        layerLevel: 1,
        //250k
    },
    {
        name: '2-humvee',
        rarity: 2,
        layerLevel: 1,
        //300k
    },
    {
        name: '3-little-bird',
        rarity: 2,
        layerLevel: 1,
        //2mil
    },
    {
        name: '4-mrap',
        rarity: 3,
        layerLevel: 1,
        //800k
    },
    {
        name: '5-warthog',
        rarity: 3,
        layerLevel: 1,
        //20mil
    },
    {
        name: '6-chinook',
        rarity: 3,
        layerLevel: 1,
        //42mil
    },
    {
        name: '7-lav',
        rarity: 4,
        layerLevel: 1,
        //4mil
    },
    {
        name: '8-blackhawk',
        rarity: 4,
        layerLevel: 1,
        //45mil
    },
    {
        name: '9-osprey',
        rarity: 4,
        layerLevel: 1,
        //84mil
    },
    {
        name: '10-apache',
        rarity: 4,
        layerLevel: 1,
        //90mil
    },
    {
        name: '11-bradley',
        rarity: 5,
        layerLevel: 1,
        //4.5mil
    },
    {
        name: '12-raptor',
        rarity: 5,
        layerLevel: 1,
        //143mil
    },
    {
        name: '13-globemaster',
        rarity: 5,
        layerLevel: 1,
        //340mil
    },
    {
        name: '14-technical',
        rarity: 6,
        layerLevel: 1,
        isComingSoon: true
    },
    {
        name: '15-abrams',
        rarity: 6,
        layerLevel: 1,
        //11mil
    },
    {
        name: '16-stealth-bomber',
        rarity: 6,
        layerLevel: 1,
        //730mil
    },
    {
        name: '17-unicorn',
        rarity: 6,
        layerLevel: 1,
        isComingSoon: true
    }
]

// lowest level
const backgrounds = [
    {
        name: '0-common',
        rarity: 0,
        layerLevel: 0,
    },
    {
        name: '1-yellow',
        rarity: 3,
        layerLevel: 0,
    },
    {
        name: '2-pink',
        rarity: 4,
        layerLevel: 0,
    },
    {
        name: '3-light-blue',
        rarity: 7,
        layerLevel: 0,
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
        fileName: '15-hind-legs',
        elements: hindLegs
    },
    {
        fileName: '16-vehicles',
        elements: vehicles
    },
    {
        fileName: '17-backgrounds',
        elements: backgrounds
    }
]