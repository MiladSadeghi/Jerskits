import { rest } from 'msw'
import {
  TKidBrandCollectionResponse,
  TLandingPageHeaderProduct,
  TLandingPageResponse
} from '../../shared/types/LandingPage.types'
import { IProduct } from '../../shared/types/Product.types'

const HeaderResponse: TLandingPageHeaderProduct[] = [
  {
    _id: '64e3d7bf8d4a87d9b5ee29b2',
    name: 'Liverpool F.C. 2023/24 Stadium Home',
    brand: 'nike',
    type: 'football',
    size: ['XS', 'M', 'L', 'XL', 'XXL', '3XL'],
    price: 79.95,
    offPrice: 0,
    gender: 'men',
    color: ['red'],
    slug: 'liverpool-fc-2023-24-stadium-home-football-shirt',
    posterTitle: 'HOME KIT 23/24',
    stadiumImage:
      'https://s6.uupload.ir/files/inside-anfield-promo-10042023_6diy.jpg',
    teamLogo: 'https://s6.uupload.ir/files/liverpool_fc.svg_jt8c.png',
    teamName: 'liverpool',
    howWasMade:
      'The recycled polyester used in Nike products begins as recycled plastic bottles, which are cleaned, shredded into flakes and converted into pellets.',
    posterDescription:
      'In addition to reducing waste, recycled polyester produces up to 30% lower carbon emissions than virgin polyester. Nike diverts an average of 1 billion plastic bottles annually from landfill and waterways.',
    kitLogo: '',
    gallery: [
      'https://s6.uupload.ir/files/liverpool-fc-2023-24-stadium-home-dri-fit-football-shirt-6zlsk4_wli3.jpg',
      'https://s6.uupload.ir/files/liverpool-fc-2023-24-stadium-home-dri-fit-football-shirt-6zlsk41_lvfo.jpg',
      'https://s6.uupload.ir/files/liverpool-fc-2023-24-stadium-home-dri-fit-football-shirt-6zlsk43_k7g2.jpg',
      'https://s6.uupload.ir/files/liverpool-fc-2023-24-stadium-home-dri-fit-football-shirt-6zlsk44_ut90.jpg',
      'https://s6.uupload.ir/files/liverpool-fc-2023-24-stadium-home-dri-fit-football-shirt-6zlsk45_d9w1.jpg',
      'https://s6.uupload.ir/files/liverpool-fc-2023-24-stadium-home-dri-fit-football-shirt-6zlsk46_4w02.jpg',
      'https://s6.uupload.ir/files/liverpool-fc-2023-24-stadium-home-dri-fit-football-shirt-6zlsk47_8925.jpg'
    ],
    poster:
      'https://s6.uupload.ir/files/liverpool-fc-2023-24-stadium-home-dri-fit-football-shirt-poster_232h.png',
    detail_product: [
      {
        title: 'Detail Product',
        description:
          "Packed with details, the Liverpool F.C. 2023/24 shirt remembers the 97 people who tragically died in the Hillsborough Disaster. A 97 set between two eternal flames resides on the inner pride, while white accents on the collar and sleeves nod to a shirt worn by the legendary '74 squad. Our Stadium collection pairs replica design details with sweat-wicking technology to give you a game-ready look inspired by your favourite team.",
        specification: ['Colour Shown: Gym Red/White', 'Style: DX2692-688']
      },
      {
        title: 'How This Was Made',
        specification: [
          'The recycled polyester used in Nike products begins as recycled plastic bottles, which are cleaned, shredded into flakes and converted into pellets. From there, the pellets are spun into new, high-quality yarn used in our products, delivering peak performance with a lower impact on the environment.',
          'In addition to reducing waste, recycled polyester produces up to 30% lower carbon emissions than virgin polyester. Nike diverts an average of 1 billion plastic bottles annually from landfill and waterways.',
          "Learn more about our Move to Zero journey towards zero carbon and zero waste, including how we're working to design product with sustainability in mind and help protect the future of where we live and play."
        ]
      }
    ]
  },
  {
    _id: '64e49b83e6ee79ab2780c8f6',
    name: 'F.C. Barcelona 2023/24 Match Home',
    brand: 'nike',
    type: 'football',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    price: 124.95,
    offPrice: 0,
    gender: 'women',
    color: ['blue', 'red'],
    slug: 'fc-barcelona-2023-24-match-home',
    gallery: [
      'https://s6.uupload.ir/files/fc-barcelona-2023-24-match-home-dri-fit-adv-football-shirt-hzjhwr_pz6f.jpg',
      'https://s6.uupload.ir/files/fc-barcelona-2023-24-match-home-dri-fit-adv-football-shirt-hzjhwr2_frrm.jpg',
      'https://s6.uupload.ir/files/fc-barcelona-2023-24-match-home-dri-fit-adv-football-shirt-hzjhwr3_dmsx.jpg',
      'https://s6.uupload.ir/files/fc-barcelona-2023-24-match-home-dri-fit-adv-football-shirt-hzjhwr4_63jo.jpg',
      'https://s6.uupload.ir/files/fc-barcelona-2023-24-match-home-dri-fit-adv-football-shirt-hzjhwr5_w6tw.jpg',
      'https://s6.uupload.ir/files/fc-barcelona-2023-24-match-home-dri-fit-adv-football-shirt-hzjhwr6_39ge.jpg'
    ],
    detail_product: [
      {
        title: 'Detail Product',
        description:
          "The F.C. Barcelona 2023/24 Home kit honours the 30-year journey of the Women's squad being incorporated into the club. The crest has a hidden diamond shape that was historically used by the Women's team, and the classic stripes have a diamond pattern along the edges. Our Match collection pairs authentic design details with lightweight, quick-drying technology to help keep the world's biggest football stars cool and comfortable on the pitch.",
        specification: [
          'Colour Shown: Deep Royal Blue/Noble Red/White',
          'Style: FD4125-456'
        ]
      },
      {
        title: 'How This Was Made',
        specification: [
          'The recycled polyester used in Nike products begins as recycled plastic bottles, which are cleaned, shredded into flakes and converted into pellets. From there, the pellets are spun into new, high-quality yarn used in our products, delivering peak performance with a lower impact on the environment.',
          'In addition to reducing waste, recycled polyester produces up to 30% lower carbon emissions than virgin polyester. Nike diverts an average of 1 billion plastic bottles annually from landfill and waterways.',
          "Learn more about our Move to Zero journey towards zero carbon and zero waste, including how we're working to design product with sustainability in mind and help protect the future of where we live and play."
        ]
      }
    ],
    posterTitle: 'F.C. Barcelona 2023/24 Stadium Home',
    stadiumImage:
      'https://s6.uupload.ir/files/fbl-esp-liga-barcelona-villarreal-2048x1366_bm84.jpg',
    teamLogo:
      'https://s6.uupload.ir/files/kisspng-fc-barcelona-logo-vector-graphics-football-image-5c71e47872d597.9276381515509679284704_b8rh.png',
    teamName: 'Barcelona',
    howWasMade:
      "The F.C. Barcelona 2023/24 Home kit honours the 30-year journey of the Women's squad being incorporated into the club. The crest has a hidden diamond shape that was historically used by the Women's team, and the classic stripes have a diamond pattern along the edges. Our Stadium collection pairs replica design details with sweat-wicking technology to give you a game-ready look inspired by your favorite team.",
    posterDescription:
      'The recycled polyester used in Nike products begins as recycled plastic bottles, which are cleaned, shredded into flakes and converted into pellets. From there, the pellets are spun into new, high-quality yarn used in our products, delivering peak performance with a lower impact on the environment.',
    kitLogo: ''
  }
]

const kidCollectionResponse: IProduct[] = [
  {
    _id: '1',
    name: 'Jordan ',
    brand: 'jordan',
    type: 'basketball',
    size: ['5'],
    price: 55,
    offPrice: 46.97,
    gender: 'kid',
    color: ['red'],
    slug: 'jordan-23-jersey',
    gallery: ['gallery'],
    detail_product: [
      {
        title: 'Product Details',
        description:
          'Kiddos can wear the jersey with the name and number of one of the best to ever play the game, Michael Jordan. This jersey is made of breathable mesh fabric and is great for a pick-up game with friends or styled with a pair of jeans.',
        specification: ['Shown: White', 'Style: 85A773-001']
      }
    ]
  },

  {
    _id: '2',
    name: 'Jordan ',
    brand: 'jordan',
    type: 'basketball',
    size: ['5'],
    price: 55,
    offPrice: 46.97,
    gender: 'kid',
    color: ['red'],
    slug: 'jordan-23-jersey',
    gallery: ['gallery'],
    detail_product: [
      {
        title: 'Product Details',
        description:
          'Kiddos can wear the jersey with the name and number of one of the best to ever play the game, Michael Jordan. This jersey is made of breathable mesh fabric and is great for a pick-up game with friends or styled with a pair of jeans.',
        specification: ['Shown: White', 'Style: 85A773-001']
      }
    ]
  }
]

export const getLandingPageMock = rest.get(
  `${import.meta.env.VITE_SERVER_URL}`,
  (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<TLandingPageResponse>({
        error: false,
        header: HeaderResponse,
        kidsCollection: kidCollectionResponse
      })
    )
  }
)

export const getKidCollectionByBrand = rest.get(
  `${import.meta.env.VITE_SERVER_URL}/kid-collection/jordan`,
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<TKidBrandCollectionResponse>({
        error: false,
        kidCollection: kidCollectionResponse
      })
    )
  }
)
