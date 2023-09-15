import ProductModel from "../models/product.model.js";

const landingProvider = async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    const headerProductsId = [
      "64e3d7bf8d4a87d9b5ee29b2",
      "64e65e04b7c149604dc3c79a",
      "64f988cf965a3409ef664c90",
    ];
    const headerProducts = products.filter((product) =>
      headerProductsId.includes(product._id.toString())
    );

    const plainHeaderProducts = headerProducts.map((product) =>
      product.toObject()
    );

    plainHeaderProducts[0].posterTitle = "HOME KIT 23/24";
    plainHeaderProducts[0].stadiumImage =
      "https://s6.uupload.ir/files/inside-anfield-promo-10042023_6diy.jpg";
    plainHeaderProducts[0].teamLogo =
      "https://s6.uupload.ir/files/liverpool_fc.svg_jt8c.png";
    plainHeaderProducts[0].teamName = "liverpool";
    plainHeaderProducts[0].howWasMade =
      "The recycled polyester used in Nike products begins as recycled plastic bottles, which are cleaned, shredded into flakes and converted into pellets.";
    plainHeaderProducts[0].posterDescription =
      "In addition to reducing waste, recycled polyester produces up to 30% lower carbon emissions than virgin polyester. Nike diverts an average of 1 billion plastic bottles annually from landfill and waterways.";
    plainHeaderProducts[0].kitLogo = plainHeaderProducts[0].gallery[3];

    plainHeaderProducts[1].posterTitle = "23/24 HOME AUTHENTIC JERSEY";
    plainHeaderProducts[1].stadiumImage =
      "https://s6.uupload.ir/files/gettyimages-1488651478_u6xx.jpg";
    plainHeaderProducts[1].teamLogo =
      "https://s6.uupload.ir/files/real-madrid-c-f-logo-c08f61d801-seeklogo.com_ybry.png";
    plainHeaderProducts[1].teamName = "Real Madrid";
    plainHeaderProducts[1].howWasMade =
      "Tradition gets a golden touch in the Real Madrid 23/24 Home Authentic Jersey. Keeping a crisp all-white base, the striking kit continues the thread of powerful design, delivering a sleek, lightweight jersey steeped in legendary soccer history.";
    plainHeaderProducts[1].posterDescription =
      "With a nod to older kits, gold accents from previous kits are re-introduced alongside navy framing. An allover, sublimation print is a subtle update to the classic all-white color, complemented by a new soccer silhouette that lets you take the clubs elegance and style off-pitch.";
    plainHeaderProducts[1].kitLogo = plainHeaderProducts[1].gallery[3];

    plainHeaderProducts[2].posterTitle = "F.C. Barcelona 2023/24 Stadium Home";
    plainHeaderProducts[2].stadiumImage =
      "https://s6.uupload.ir/files/fbl-esp-liga-barcelona-villarreal-2048x1366_bm84.jpg";
    plainHeaderProducts[2].teamLogo =
      "https://s6.uupload.ir/files/kisspng-fc-barcelona-logo-vector-graphics-football-image-5c71e47872d597.9276381515509679284704_b8rh.png";
    plainHeaderProducts[2].teamName = "Barcelona";
    plainHeaderProducts[2].howWasMade =
      "The F.C. Barcelona 2023/24 Home kit honours the 30-year journey of the Women's squad being incorporated into the club. The crest has a hidden diamond shape that was historically used by the Women's team, and the classic stripes have a diamond pattern along the edges. Our Stadium collection pairs replica design details with sweat-wicking technology to give you a game-ready look inspired by your favorite team.";
    plainHeaderProducts[2].posterDescription =
      "The recycled polyester used in Nike products begins as recycled plastic bottles, which are cleaned, shredded into flakes and converted into pellets. From there, the pellets are spun into new, high-quality yarn used in our products, delivering peak performance with a lower impact on the environment.";
    plainHeaderProducts[2].kitLogo = plainHeaderProducts[2].gallery[5];

    return res.status(200).json({ error: false, header: plainHeaderProducts });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default landingProvider;
