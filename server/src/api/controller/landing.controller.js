import ProductModel from "../models/product.model.js";

export const landingProvider = async (req, res, next) => {
  const { isUser } = req;
  try {
    const headerProductsId = [
      "64e3d7bf8d4a87d9b5ee29b2",
      "64e65e04b7c149604dc3c79a",
      "64f988cf965a3409ef664c90",
    ];
    const headerProducts = await ProductModel.find({
      _id: headerProductsId,
    }).lean();

    headerProducts[0].posterTitle = "HOME KIT 23/24";
    headerProducts[0].stadiumImage =
      "https://s13.uupload.ir/files/miladsdgh/inside-anfield-promo-10042023_6diy.webp";
    headerProducts[0].teamLogo =
      "https://s6.uupload.ir/files/liverpool_fc.svg_jt8c.png";
    headerProducts[0].teamName = "liverpool";
    headerProducts[0].howWasMade =
      "The recycled polyester used in Nike products begins as recycled plastic bottles, which are cleaned, shredded into flakes and converted into pellets.";
    headerProducts[0].posterDescription =
      "In addition to reducing waste, recycled polyester produces up to 30% lower carbon emissions than virgin polyester. Nike diverts an average of 1 billion plastic bottles annually from landfill and waterways.";
    headerProducts[0].kitLogo = headerProducts[0].gallery[3];

    headerProducts[1].posterTitle = "23/24 HOME AUTHENTIC JERSEY";
    headerProducts[1].stadiumImage =
      "https://s13.uupload.ir/files/miladsdgh/gettyimages-1488651478_u6xx.jpg";
    headerProducts[1].teamLogo =
      "https://s6.uupload.ir/files/real-madrid-c-f-logo-c08f61d801-seeklogo.com_ybry.png";
    headerProducts[1].teamName = "Real Madrid";
    headerProducts[1].howWasMade =
      "Tradition gets a golden touch in the Real Madrid 23/24 Home Authentic Jersey. Keeping a crisp all-white base, the striking kit continues the thread of powerful design, delivering a sleek, lightweight jersey steeped in legendary soccer history.";
    headerProducts[1].posterDescription =
      "With a nod to older kits, gold accents from previous kits are re-introduced alongside navy framing. An allover, sublimation print is a subtle update to the classic all-white color, complemented by a new soccer silhouette that lets you take the clubs elegance and style off-pitch.";
    headerProducts[1].kitLogo = headerProducts[1].gallery[3];

    headerProducts[2].posterTitle = "F.C. Barcelona 2023/24 Stadium Home";
    headerProducts[2].stadiumImage =
      "https://s13.uupload.ir/files/miladsdgh/fbl-esp-liga-barcelona-villarreal-2048x1366_bm84.webp";
    headerProducts[2].teamLogo =
      "https://s6.uupload.ir/files/kisspng-fc-barcelona-logo-vector-graphics-football-image-5c71e47872d597.9276381515509679284704_b8rh.png";
    headerProducts[2].teamName = "Barcelona";
    headerProducts[2].howWasMade =
      "The F.C. Barcelona 2023/24 Home kit honours the 30-year journey of the Women's squad being incorporated into the club. The crest has a hidden diamond shape that was historically used by the Women's team, and the classic stripes have a diamond pattern along the edges. Our Stadium collection pairs replica design details with sweat-wicking technology to give you a game-ready look inspired by your favorite team.";
    headerProducts[2].posterDescription =
      "The recycled polyester used in Nike products begins as recycled plastic bottles, which are cleaned, shredded into flakes and converted into pellets. From there, the pellets are spun into new, high-quality yarn used in our products, delivering peak performance with a lower impact on the environment.";
    headerProducts[2].kitLogo = headerProducts[2].gallery[5];

    const kidsCollectionProducts = await ProductModel.find({
      gender: "kid",
      brand: "nike",
    });

    return res.status(200).json({
      error: false,
      header: headerProducts,
      kidsCollection: kidsCollectionProducts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const kidCollectionProvider = async (request, response, next) => {
  const { user, isUser } = request;
  const brand = request.params.brand || "nike";

  try {
    const validBrands = ["nike", "adidas", "jordan", "puma"];
    if (!validBrands.includes(brand)) {
      const errorMessage = `${brand} does not have any kid jerseys!`;
      const error = new Error(errorMessage);
      error.status = 404;
      throw error;
    }

    const kidsCollectionProducts = await ProductModel.find({
      gender: "kid",
      brand,
    });

    if (kidsCollectionProducts.length === 0) {
      const errorMessage = `${brand} does not have any kid jerseys!`;
      const error = new Error(errorMessage);
      error.status = 404;
      throw error;
    }

    return response
      .status(200)
      .json({ error: false, kidCollection: kidsCollectionProducts });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
