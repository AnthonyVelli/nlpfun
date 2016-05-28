**node label**:
 > Breaks data/trainingData.txt into sentences.  
	Sentences are tokenized, and tokens are assigned a part of speech label.
	User is prompted to label each sentence, either a 1 (check worthy factual statement) or 0. 
	A labelling summary is logged, and the results are saved to data/labelled.txt.

**node train**:
	Reads labelled data from data/labelled.txt.
	Feeds labelled data through SVM.
	Logs training summary report.
	SVM Model is saved to data/SVM.txt.

**node predict**:
	Restores SVM model from data/SVM.txt.
	Reads data to be predicted from predictionData.txt, breaks into sentences, tokenizes and assigns part of speech labels.
	Uses model to predict 1 or 0 for predictionData.
	Logs prediction summary report.
	Writes sentences scored a 1 to data/results/fact.txt & sentences scored a 0 to data/results/noFact.txt.