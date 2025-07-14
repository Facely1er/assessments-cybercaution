@@ .. @@
            <Card className="hover:shadow-lg transition-shadow dark:border-muted">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Ransomware Guide</h3>
                <p className="text-muted-foreground mb-4">
                  CISA's comprehensive guide on ransomware prevention, detection, and response for organizations.
                </p>
                <a 
-                  href="https://www.cisa.gov/sites/default/files/publications/CISA_MS-ISAC_Ransomware%20Guide_S508C.pdf" 
+                  href="https://www.cisa.gov/resources-tools/guides/ransomware-guide" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Download Guide
                  <Download className="ml-2 h-4 w-4" />
                </a>
              </CardContent>
            </Card>