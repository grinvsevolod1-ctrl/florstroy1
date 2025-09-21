import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 14 },
});

export default function PDFPreview({ calculation }: { calculation: string }) {
  return (
    <PDFViewer style={{ width: '100%', height: '500px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Расчёт заявки</Text>
            <Text style={styles.text}>{calculation}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
