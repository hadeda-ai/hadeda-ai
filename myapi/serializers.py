from rest_framework import serializers
import spacy

from .models import ClientText, Keyword

class ClientTextKeyWords(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ['text', 'word', 'entity_type']

class ClientTextSerializer(serializers.ModelSerializer):
    keywords = ClientTextKeyWords(many=True, required=False)
    
    class Meta:
        model = ClientText
        fields = ['url', 'id', 'text', 'keywords']

    def create(self, validated_data):
        client_text = ClientText.objects.create(**validated_data)

        nlp = spacy.load("nl_core_news_sm")

        doc = nlp(client_text.text)

        for ent in doc.ents:
            Keyword.objects.create(**{"text":client_text, "word":ent.text, "entity_type":ent.label_})
            
        return client_text

