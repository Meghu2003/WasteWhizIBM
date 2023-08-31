from flask import Flask,jsonify,request
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import joblib
model=joblib.load('Model')
df=pd.read_csv('train.csv')
industry=list(df['Industry'].value_counts().index)
industry.sort()
pitch=list(df['Pitch'].value_counts().index)
pitch.sort()
leadRevenue=list(df['Lead_revenue'].value_counts().index)
leadRevenue.sort()
fundCategory=list(df['Fund_category'].value_counts().index)
fundCategory.sort()
hiringCandidate=list(df['Hiring_candidate_role'].value_counts().index)
hiringCandidate.sort()
levelOfMeeting=list(df['Level_of_meeting'].value_counts().index)
levelOfMeeting.sort()
lastLeadUpdate=list(df['Last_lead_update'].value_counts().index)
lastLeadUpdate.sort()
resources=list(df['Resource'].value_counts().index)
resources.sort()
internalRating=list(df['Internal_rating'].value_counts().index)
internalRating.sort()

from flask_cors import CORS
app=Flask(__name__)
CORS(app)
@app.route('/arrays',methods=['GET'])
def arrays():
    data={'industryarr':industry,'pitcharr':pitch,'leadrevenuearr':leadRevenue,'fundcategoryarr':fundCategory,'hiringcandidatearr':hiringCandidate,'levelofmeetingarr':levelOfMeeting,'lastleadupdatearr':lastLeadUpdate,'resourcearr':resources,'internalratingarr':internalRating}
    return jsonify(data)
@app.route('/api/submit',methods=['POST'])
def hello_world():
    inputValues=request.json
    industryIP=industry.index(inputValues['industry'])
    deal_value=int(inputValues['deal_value'])
    weighted_amount=int(inputValues['weighted_amount'])
    pitchIP=pitch.index(inputValues['pitch'])
    lead_revenue=leadRevenue.index(inputValues['lead_revenue'])
    fund_category=fundCategory.index(inputValues['fund_category'])
    hiring_cand=hiringCandidate.index(inputValues['hiring_candidate'])
    level_of_meeting=levelOfMeeting.index(inputValues['level_of_meeting'])
    last_lead_update=lastLeadUpdate.index(inputValues['last_update'])
    resourceIP=resources.index(inputValues['resource'])
    internal_rating=internalRating.index(int(inputValues['internal_rating']))
    X=[[industryIP,deal_value,weighted_amount,pitchIP,lead_revenue,fund_category,hiring_cand,level_of_meeting,last_lead_update,resourceIP,internal_rating]]
    y=str(model.predict(X)[0])
    return jsonify({'message':y})
if __name__=="__main__":
    app.run()