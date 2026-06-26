import React from "react";
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
    padding: 30,
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
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
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

  /* ========== BACK COVER PAGE Styles ========== */
  backCoverPage: {
    padding: 30,
    position: "relative",
  },
  backCoverPageContainer: {
    position: "relative",
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
    bottom: 53,
    left: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  footerLogoContainerFirstPage: {
    bottom: 0,
  },
  imageFooter: {
    width: 64,
    height: 64,
  },
});

function PageFooter({ footer, isFirstPage }) {
  return (
    <View style={styles.footer} fixed>
      <View> </View>

      <View
        style={[
          styles.footerLogoContainer,
          isFirstPage && styles.footerLogoContainerFirstPage,
        ]}
      >
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
        <PageFooter footer={footer} isFirstPage={true} />
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
