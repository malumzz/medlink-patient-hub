
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Reply, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MessageDetails = ({ message, isOpen, onClose, onReply, onDelete }) => {
  const [replyContent, setReplyContent] = useState('');
  const [showReply, setShowReply] = useState(false);
  const { toast } = useToast();

  if (!message) return null;

  const handleReply = () => {
    if (!replyContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message",
        variant: "destructive"
      });
      return;
    }

    const replyMessage = {
      id: Date.now(),
      sender: 'You',
      recipient: message.sender,
      subject: `Re: ${message.subject}`,
      content: replyContent,
      time: 'Just now',
      read: true,
      type: 'sent'
    };

    onReply(replyMessage);
    setReplyContent('');
    setShowReply(false);
    
    toast({
      title: "Success",
      description: "Reply sent successfully"
    });
  };

  const handleDelete = () => {
    onDelete(message.id);
    onClose();
    toast({
      title: "Success",
      description: "Message deleted successfully"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Message Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{message.subject}</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReply(!showReply)}
                >
                  <Reply className="h-4 w-4 mr-1" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">From: {message.sender}</p>
            <p className="text-sm text-gray-500">{message.time}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>

          {showReply && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Reply to this message:</h4>
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Type your reply here..."
                rows={4}
                className="mb-3"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowReply(false)}>
                  Cancel
                </Button>
                <Button onClick={handleReply}>Send Reply</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetails;
