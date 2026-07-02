// @ts-nocheck
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    flexDirection: "column",
    padding: 30,
    position: "relative",
    backgroundColor: "#FEFEFE",
  },

  /* ========== FRONT COVER PAGE Styles ========== */
  frontCoverPage: {
    position: "relative",
  },
  frontCoverPageContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  verticalLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(85, 85, 85, 0.05)",
  },
  line1: {
    left: "25%",
  },
  line2: {
    left: "50%",
  },
  line3: {
    left: "75%",
  },
  frontCoverPageImageContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
    opacity: 0.3,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  frontCoverPageImage: {
    objectFit: "cover",
    objectPosition: "center",
  },
  frontCoverPageTitleContainer: {
    position: "absolute",
    left: 0,
    top: 550,
    width: "100%",
    textAlign: "center",
  },
  frontCoverPageText: {
    fontFamily: "Inter",
    fontSize: 57,
    fontWeight: 500,
    marginBottom: 10,
    letterSpacing: 1,
    zIndex: 2,
  },
  frontCoverPageDescriptionContainer: {
    position: "absolute",
    left: 0,
    top: 650,
    width: "100%",
    textAlign: "center",
  },
  frontCoverPageDescription: {
    fontFamily: "Inter",
    fontStyle: "italic",
    fontSize: 36,
    fontWeight: 400,
    marginBottom: 10,
    zIndex: 2,
  },

  /* ========== PRICE BREAKDOWN PAGE Styles ========== */
  priceBreakdownPage: {
    padding: 30,
    position: "relative",
  },
  priceBreakdownPageContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    gap: 24,
    flexDirection: "column",
    padding: 30,
    backgroundColor: "#F9F9F9",
  },
  priceBreakdownPageTitleContainer: {
    alignItems: "center",
  },
  priceBreakdownPageTitle: {
    fontFamily: "Inter",
    fontSize: 40,
    fontWeight: 500,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  pricebreakdownPageListTitleContainer: {
    alignItems: "flex-start",
    paddingBottom: 24,
  },
  pricebreakdownPageListTitle: {
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: 500,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  priceBreakdownPageListContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  priceBreakdownPageListItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  priceBreakdownPageListItemTextContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  priceBreakdownPageListItemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    flexDirection: "row",
  },
  priceBreakdownPageListItemTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    paddingBottom: 4,
    gap: 4,
  },
  priceBreakdownPageListItemModel: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0.2,
  },
  priceBreakdownPageListItemSize: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 400,
    fontStyle: "italic",
    letterSpacing: 0.2,
  },
  priceBreakdownPageListItemQuantity: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 0.2,
  },
  priceBreakdownPageListItemText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 400,
    textAlign: "left",
    paddingLeft: 36,
    letterSpacing: 0.2,
    width: "30%",
  },
  priceBreakdownPageListItemTextBolded: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 500,
    textAlign: "left",
    paddingLeft: 24,
    letterSpacing: 0.2,
    width: "30%",
    textDecoration: "underline",
  },
  priceBreakdownPageListItemImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  priceBreakdownPageListItemImage: {
    maxWidth: 64,
    maxHeight: 64,
    objectFit: "cover",
    objectPosition: "center",
  },

  /* ========== ORDER DAYA PAGE Styles ========== */
  orderDataPage: {
    padding: 30,
    position: "relative",
  },
  orderDataPageContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    padding: 30,
    backgroundColor: "#F9F9F9",
  },
  orderDataPageTotalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  orderDataPageRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 4,
  },
  orderDataPageNote: {
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: 0.2,
    marginBottom: 64,
    paddingLeft: 12,
  },
  orderDataPageRowIncreased: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
  },
  orderDataPageTotalLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#000000",
  },
  orderDataPageTotalLineSignature: {
    height: 1,
    backgroundColor: "#000000",
    width: "40%",
  },
  orderDataPageTextBolded: {
    fontFamily: "Inter",
    fontStyle: "italic",
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: 0.2,
  },
  orderDataPageText: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: 400,
    letterSpacing: 0.2,
  },
  orderDataPageDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  orderDataPageTitle: {
    fontFamily: "Inter",
    fontSize: 40,
    fontWeight: 500,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  orderDataPageSignatureContainer: {
    position: "absolute",
    bottom: 120,
    left: 60,
    right: 60,
    width: 821,
  },

  /* ========== BACK COVER PAGE Styles ========== */
  backCoverPage: {
    padding: 30,
    position: "relative",
  },
  backCoverPageContainer: {
    position: "relative",
    padding: 30,
    backgroundColor: "#F9F9F9",
    width: "100%",
    height: "100%",
  },
  backCoverPageImageContainer: {
    position: "absolute",
    top: 650,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  backCoverPageImage: {
    width: 512,
    height: 512,
  },
  backCoverPageBottomTitleContainer: {
    position: "absolute",
    top: 550,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  backCoverPageBottomTitle: {
    fontFamily: "Inter",
    fontSize: 48,
    fontWeight: 500,
    textAlign: "center",
    letterSpacing: 0.2,
  },

  /* ========== FOOTER STYLES ========== */
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerLogoContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  imageFooter: {
    width: 64,
    height: 64,
  },
});

function PageFooter({ footer }) {
  return (
    <View style={styles.footer} fixed>
      <View> </View>

      <View style={styles.footerLogoContainer}>
        {footer?.logo && <Image src={footer.logo} style={styles.imageFooter} />}
      </View>

      <View> </View>
    </View>
  );
}

function PdfGeneratorFinal({
  footer,
  frontCoverPage,
  priceBreakdownPage,
  orderDataPage,
  backCoverPage,
}) {
  return (
    <Document>
      {/* FRONT COVER PAGE */}
      <Page
        size={{ width: 941, height: 1414 }}
        style={[styles.page, styles.frontCoverPage]}
      >
        <View style={styles.frontCoverPageContainer}>
          <View style={[styles.verticalLine, styles.line1]} />
          <View style={[styles.verticalLine, styles.line2]} />
          <View style={[styles.verticalLine, styles.line3]} />
          <View style={styles.frontCoverPageImageContainer}>
            {frontCoverPage?.image && (
              <Image
                src={frontCoverPage.image}
                style={styles.frontCoverPageImage}
              />
            )}
          </View>
          <View style={styles.frontCoverPageTitleContainer}>
            <Text style={styles.frontCoverPageText}>
              {frontCoverPage.title}
            </Text>
          </View>
          <View style={styles.frontCoverPageDescriptionContainer}>
            <Text style={styles.frontCoverPageDescription}>
              {frontCoverPage.description}
            </Text>
          </View>
        </View>
        <PageFooter footer={footer} />
      </Page>

      {/* PRICE BREKADOWN PAGES */}
      {priceBreakdownPage.itemSets.map((itemSet) => (
        <Page
          size={{ width: 941, height: 1414 }}
          style={[styles.page, styles.priceBreakdownPage]}
        >
          <View style={styles.priceBreakdownPageContainer}>
            <View style={styles.priceBreakdownPageTitleContainer}>
              <Text style={styles.priceBreakdownPageTitle}>
                {priceBreakdownPage.title}
              </Text>
            </View>
            <View style={styles.pricebreakdownPageListTitleContainer}>
              <Text style={styles.pricebreakdownPageListTitle}>
                {itemSet.title}
              </Text>
            </View>
            <View style={styles.priceBreakdownPageListContainer}>
              {itemSet.pieces.map((piece, index) => (
                <View style={styles.priceBreakdownPageListItem} key={index}>
                  <View style={styles.priceBreakdownPageListItemTextContainer}>
                    {/* TITLE OF THE ITEM */}
                    <View
                      style={styles.priceBreakdownPageListItemTitleContainer}
                    >
                      <Text style={styles.priceBreakdownPageListItemModel}>
                        {piece.model}
                      </Text>
                      <Text style={styles.priceBreakdownPageListItemSize}>
                        {`- size ${piece.size}`}
                      </Text>
                      <Text style={styles.priceBreakdownPageListItemQuantity}>
                        {`(${piece.quantity} piece${piece.quantity > 1 ? "s" : ""})`}
                      </Text>
                    </View>
                    {/* ITEM PIECES */}
                    <View
                      style={styles.priceBreakdownPageListItemRow}
                      key={index}
                    >
                      <Text style={styles.priceBreakdownPageListItemTextBolded}>
                        Part name
                      </Text>
                      <Text style={styles.priceBreakdownPageListItemTextBolded}>
                        Color
                      </Text>
                      <Text style={styles.priceBreakdownPageListItemTextBolded}>
                        Added price
                      </Text>
                    </View>
                    {piece.options
                      .filter((o) => o.partName)
                      .map((option, index) => (
                        <View
                          style={{
                            ...styles.priceBreakdownPageListItemRow,
                            paddingBottom:
                              index ===
                              piece.options.filter((o) => o.partName).length - 1
                                ? 6
                                : 0,
                          }}
                          key={index}
                        >
                          <Text style={styles.priceBreakdownPageListItemText}>
                            {option.partName}
                          </Text>
                          <Text style={styles.priceBreakdownPageListItemText}>
                            {option.colorDescription}
                          </Text>
                          <Text style={styles.priceBreakdownPageListItemText}>
                            {`$${option.extraPrice.toFixed(2)}`}
                          </Text>
                        </View>
                      ))}
                    {piece.options.find((option) => option.name) && (
                      <>
                        <View
                          style={styles.priceBreakdownPageListItemRow}
                          key={index}
                        >
                          <Text
                            style={styles.priceBreakdownPageListItemTextBolded}
                          >
                            Part name
                          </Text>
                          <Text
                            style={styles.priceBreakdownPageListItemTextBolded}
                          >
                            Type
                          </Text>
                          <Text
                            style={styles.priceBreakdownPageListItemTextBolded}
                          >
                            Added price
                          </Text>
                        </View>
                        {piece.options
                          .filter((o) => o.name)
                          .map((option, index) => (
                            <View
                              style={{
                                ...styles.priceBreakdownPageListItemRow,
                                paddingBottom:
                                  index ===
                                  piece.options.filter((o) => o.name).length - 1
                                    ? 6
                                    : 0,
                              }}
                              key={index}
                            >
                              <Text
                                style={styles.priceBreakdownPageListItemText}
                              >
                                {option.name.charAt(0).toUpperCase() +
                                  option.name.slice(1)}
                              </Text>
                              <Text
                                style={styles.priceBreakdownPageListItemText}
                              >
                                {option.value}
                              </Text>
                              <Text
                                style={styles.priceBreakdownPageListItemText}
                              >
                                {`$${option.extraPrice.toFixed(2)}`}
                              </Text>
                            </View>
                          ))}
                      </>
                    )}
                    {/* PRICE PER ITEM */}
                    <View style={styles.priceBreakdownPageListItemRow}>
                      <Text style={styles.priceBreakdownPageListItemTextBolded}>
                        Price per item
                      </Text>
                      <Text
                        style={styles.priceBreakdownPageListItemTextBolded}
                      ></Text>
                      <Text style={styles.priceBreakdownPageListItemText}>
                        {`$${piece.pricePerItem.toFixed(2)}`}
                      </Text>
                    </View>
                    {/* TOTAL PRICE PER ITEM */}
                    <View
                      style={{
                        ...styles.priceBreakdownPageListItemRow,
                        paddingBottom: 6,
                      }}
                    >
                      <Text style={styles.priceBreakdownPageListItemTextBolded}>
                        Total price
                      </Text>
                      <Text
                        style={styles.priceBreakdownPageListItemTextBolded}
                      ></Text>
                      <Text style={styles.priceBreakdownPageListItemText}>
                        {`$${piece.totalPrice.toFixed(2)}`}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.priceBreakdownPageListItemImageContainer}>
                    {piece.image && (
                      <Image
                        src={piece.image}
                        style={styles.priceBreakdownPageListItemImage}
                      />
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
          <PageFooter footer={footer} />
        </Page>
      ))}

      {/* ORDER DATA PAGE */}
      <Page size={{ width: 941, height: 1414 }} style={styles.orderDataPage}>
        <View style={styles.orderDataPageContainer}>
          {/* TOTAL PRICE */}
          <View style={styles.orderDataPageTotalContainer}>
            <Text style={styles.orderDataPageTitle}>
              {orderDataPage.total.title}
            </Text>
            <View style={styles.orderDataPageRow}>
              <Text style={styles.orderDataPageTextBolded}>Total price:</Text>
              <Text style={styles.orderDataPageText}>
                {`$${orderDataPage.total.price.totalPrice.toFixed(2)}`}
              </Text>
            </View>
            <View style={styles.orderDataPageRow}>
              <View style={styles.orderDataPageTotalLine} />
            </View>
            <View style={styles.orderDataPageRow}>
              <Text style={styles.orderDataPageNote}>
                {orderDataPage.total.price.note}
              </Text>
            </View>
          </View>
          {/* ORDER DATA */}
          <View style={styles.orderDataPageDataContainer}>
            <Text style={styles.orderDataPageTitle}>{orderDataPage.title}</Text>
            <View style={styles.orderDataPageRow}>
              <Text style={styles.orderDataPageTextBolded}>Compay name</Text>
              <Text style={styles.orderDataPageTextBolded}>Client name</Text>
            </View>
            <View style={styles.orderDataPageRowIncreased}>
              <Text style={styles.orderDataPageText}>
                {orderDataPage.companyData.name}
              </Text>
              <Text style={styles.orderDataPageText}>
                {orderDataPage.userData.name}
              </Text>
            </View>
            <View style={styles.orderDataPageRow}>
              <Text style={styles.orderDataPageTextBolded}>Compay phone</Text>
              <Text style={styles.orderDataPageTextBolded}>Client phone</Text>
            </View>
            <View style={styles.orderDataPageRowIncreased}>
              <Text style={styles.orderDataPageText}>
                {orderDataPage.companyData.phone}
              </Text>
              <Text style={styles.orderDataPageText}>
                {orderDataPage.userData.phone}
              </Text>
            </View>
            <View style={styles.orderDataPageRow}>
              <Text style={styles.orderDataPageTextBolded}>Compay email</Text>
              <Text style={styles.orderDataPageTextBolded}>Client email</Text>
            </View>
            <View style={styles.orderDataPageRowIncreased}>
              <Text style={styles.orderDataPageText}>
                {orderDataPage.companyData.email}
              </Text>
              <Text style={styles.orderDataPageText}>
                {orderDataPage.userData.email}
              </Text>
            </View>
            <View style={styles.orderDataPageRow}>
              <Text style={styles.orderDataPageTextBolded}>Compay address</Text>
              <Text style={styles.orderDataPageTextBolded}>Client address</Text>
            </View>
            <View style={styles.orderDataPageRow}>
              <Text style={styles.orderDataPageText}>
                {orderDataPage.companyData.address}
              </Text>
              <Text style={styles.orderDataPageText}>
                {orderDataPage.userData.address}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.orderDataPageSignatureContainer}>
          <View style={{ ...styles.orderDataPageRow, paddingBottom: 36 }}>
            <Text style={styles.orderDataPageTextBolded}>Dealer signature</Text>
            <Text style={styles.orderDataPageTextBolded}>Client signature</Text>
          </View>
          <View style={styles.orderDataPageRow}>
            <View style={styles.orderDataPageTotalLineSignature} />
            <View style={styles.orderDataPageTotalLineSignature} />
          </View>
        </View>
        <PageFooter footer={footer} />
      </Page>

      {/* BACK COVER PAGE */}
      <Page size={{ width: 941, height: 1414 }} style={styles.backCoverPage}>
        <View style={styles.backCoverPageContainer}>
          <View style={styles.backCoverPageBottomTitleContainer}>
            <Text style={styles.backCoverPageBottomTitle}>
              {backCoverPage.title}
            </Text>
          </View>
          <View style={styles.backCoverPageImageContainer}>
            {backCoverPage?.image && (
              <Image
                src={backCoverPage.image}
                style={styles.backCoverPageImage}
              />
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PdfGeneratorFinal;
