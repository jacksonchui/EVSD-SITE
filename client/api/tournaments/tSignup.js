if(Meteor.isClient){


	//functions
	Template.tSignup.helpers({
		tournaments: function (){
			return Tournaments.find({}); 
		},
		users: function(){
			return Meteor.users.find({}); //only return certain fields
		},
		tournamentList: function (){
			return TournamentList.find({});
		}
	});
	Template.tSignup.events({
		//submit is a type of HTML input
		"submit .add-tournament": function(event){
				//consent information (NEEDS TO BE IMPLEMENTED)
			let studentConsent = event.target.studentConsent.value,
				parentConsent = event.target.parentConsent.value;
				//partner 1
			let userFirst = Meteor.user().profile.firstName,
				userLast = Meteor.user().profile.lastName,
				userEmail = Meteor.user().emails[0].address;
				//selected partner
			let username = event.target.partner.value, //this gets the partner's username
				partner = Meteor.users.findOne({username:username}),
				partnerFirst = partner.profile.firstName,
				partnerLast = partner.profile.lastName,
				partnerEmail = partner.emails[0].address;
			let	judgeFirst= event.target.judgeFirst.value,
			 	judgeLast= event.target.judgeLast.value,
				judgeEmail= event.target.judgeEmail.value,
				judgePhone= event.target.judgePhone.value

			if(parentConsent == "yes" && studentConsent == "yes"){
					var entry ={
						 tournament : event.target.tournament.value,
						 userFirst : userFirst,
						 userLast : userLast,
						 userEmail : userEmail,
						 
						 partnerFirst : partnerFirst,
						 partnerLast : partnerLast,
						 partnerEmail : partnerEmail,
						 
						 studentConsent: studentConsent,
						 parentConsent: parentConsent,

						 judgeFirst: judgeFirst,
						 judgeLast: judgeLast,
						 judgeEmail: judgeEmail,
						 judgePhone: judgePhone,
					};
					Meteor.call('addTournament',entry);
					//send some confirmation alert
				};
		},
		"click .delete-tournament": function(event){
			Meteor.call('removeTournament', this._id);
		},
	});
}