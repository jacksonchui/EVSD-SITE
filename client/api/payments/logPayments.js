if (Meteor.isClient){
	Template.logPayments.helpers({
		users: function(){
			return Meteor.users.find({}); //only return certain fields
			}
		});
	Template.logPayments.events({
		'submit .log-payment':function(event){
      let checkName = event.target.name.value;
			let checkAmount = event.target.amount.value;
			let written = event.target.dateWritten.value;
			let deposited = event.target.dateDeposited.value;
			let checkMemo = event.target.memo.value;
      Meteor.users.update(Meteor.userId(), {
        $set: {"profile.balance": (Meteor.user().profile.balance + Number(checkAmount))}
      })
			Meteor.users.update(Meteor.userId(), {
				$addToSet: {"profile.accountBalanceLog": {cc: false, amount: checkAmount, name: checkName, date: new Date(), dateWritten: written, dateDeposited: deposited, memo: checkMemo}}
			})
		},
	});
}
