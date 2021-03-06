module.exports = {
  surveyData: async (req, res) => {
    const {
      years,
      focus,
      investable_assets,
      comment,
      presenter,
      webinar_name,
      scheduleDate,
    } = req.body;
    const {    
      first_name,
      last_name,
      phone,
      email,} = req.body.user
    const db = req.app.get("db");

    try {
      const survey = await db.fsi_webinar_clients.insert({
        yrs_to_retire: years,
        focus,
        investable_assets,
        comments: comment,
        webinar_name,
        schedule: scheduleDate,
        first_name,
        last_name,
        phone,
        email,
        presenter,
      });
      return res.status(200).send(survey);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
