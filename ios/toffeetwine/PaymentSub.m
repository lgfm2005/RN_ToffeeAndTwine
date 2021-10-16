//
//  PaymentSub.m
//  toffeetwine
//
//  Created by USSLLC on 10/16/21.
//

#import "PaymentSub.h"

#define kTutorialPointProductID @"com.toffeeTwine.apps.monthlysubscription"
#define SHARED_SECRET @"19b841bde30e4e3fa0e6273ccb8e5e63  "

@implementation PaymentSub


#pragma mark - IN-APPDELEGATES

//- (void)productsRequest:(SKProductsRequest *)request didReceiveResponse:(SKProductsResponse *)response
//{
//   // SubscriptionService
//  
//    SKProduct *validProduct = nil;
//    NSInteger count = [response.products count];
//    if(count > 0){
//        validProduct = [response.products objectAtIndex:0];
//        NSLog(@"Products Available!");
//        [self purchase:validProduct];
//    }
//    else if(!validProduct){
//        NSLog(@"No products available");
//        //this is called if your product id is not valid, this shouldn't be called unless that happens.
//    }
//}
//
//- (void)purchase:(SKProduct *)product
//{
//    
//    NSUserDefaults *prefas=[NSUserDefaults standardUserDefaults];
//    
//    [prefas setObject:@"1" forKey:@"PaymentOneTime"];
//    [prefas synchronize];
//    
//    SKPayment *payment = [SKPayment paymentWithProduct:product];
//    
//    [[SKPaymentQueue defaultQueue] addTransactionObserver:self];
//    [[SKPaymentQueue defaultQueue] addPayment:payment];
//}
//
///*
// - (IBAction) restore{
// this is called when the user restores purchases, you should hook this up to a button
// [[SKPaymentQueue defaultQueue] addTransactionObserver:self];
// [[SKPaymentQueue defaultQueue] restoreCompletedTransactions];
// }*/
//
//- (void) paymentQueueRestoreCompletedTransactionsFinished:(SKPaymentQueue *)queue
//{
//    NSLog(@"received restored transactions: %lu", (unsigned long)queue.transactions.count);
//    for(SKPaymentTransaction *transaction in queue.transactions)
//    {
//        if(transaction.transactionState == SKPaymentTransactionStateRestored)
//        {
//            //called when the user successfully restores a purchase
//            NSLog(@"Transaction state -> Restored");
//            
//            [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
//            break;
//        }
//    }
//}
//
//- (void)paymentQueue:(SKPaymentQueue *)queue updatedTransactions:(NSArray *)transactions
//{
//    
//    for(SKPaymentTransaction *transaction in transactions)
//    {
//        switch(transaction.transactionState)
//        {
//            case SKPaymentTransactionStatePurchasing: NSLog(@"Transaction state -> Purchasing");
//                //called when the user is in the process of purchasing, do not add any of your own code here.
//                
//                break;
//            case SKPaymentTransactionStatePurchased:
//      
//                
//             
//                
//                if ([_swMonthPay isOn])
//                {
//                    NSUserDefaults *prefas=[NSUserDefaults standardUserDefaults];
//                    
//                    
//                    
//                    NSString *PaymentOneTime=[prefas objectForKey:@"PaymentOneTime"];
//                    
//                    
//                    
//                    NSString *strRecipt=@"";
//                    NSURL *receiptURL = [[NSBundle mainBundle] appStoreReceiptURL];
//                    
//                    
//                    NSData *receipt = [NSData dataWithContentsOfURL:receiptURL];
//                    if (receipt!=nil)
//                    {
//                       strRecipt=[receipt base64EncodedStringWithOptions:0];
//                        strauthorizationCode=@"";strMetadataID=@"";
//                        
//                        if ([PaymentOneTime isEqualToString:@"1"])
//                        {
//                            
//                            [self SubscriptionInfoAutoPay:strRecipt];
//                            [prefas removeObjectForKey:@"PaymentOneTime"];
//                        }
//
//                    }
//                    
//                }
//                [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
//
//                NSLog(@"Transaction state -> Purchased");
//                break;
//            case SKPaymentTransactionStateRestored:
//                NSLog(@"Transaction state -> Restored");
//                //add the same code as you did from SKPaymentTransactionStatePurchased here
//                [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
//                               // [CommanFunction stopanimate:LoadingView];
//                break;
//            case SKPaymentTransactionStateFailed:
//                //called when the transaction does not finish
//                if(transaction.error.code == SKErrorPaymentCancelled){
//                    NSLog(@"Transaction state -> Cancelled");
//                    
//                    // [CommanFunction stopanimate:LoadingView];
//                    //the user cancelled the payment ;(
//                }
//                NSLog(@"error:%@",transaction.error);
//                [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
//                break;
//        }
//    }
//}
//
////#pragma mark inAppPurchase Code
//-(void)fetchAvailableProducts
//{
//
//   
//        if([SKPaymentQueue canMakePayments])
//        {
//            SKProductsRequest *productsRequest = [[SKProductsRequest alloc] initWithProductIdentifiers:[NSSet setWithObject:kTutorialPointProductID]];
//            productsRequest.delegate = self;
//            [productsRequest start];
//        }
//        else
//        {
//            NSLog(@"User cannot make payments due to parental controls");
//            //this is called the user cannot make payments, most likely due to parental controls
//        }
//
//   
//    
//}
@end
